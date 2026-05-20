const { chromium } = require('playwright');

// ==============================================================================
// SELECTORS — update these to match your target application
// ==============================================================================
const WEBSITE_URL      = 'https://chatbotchatapp.com/';
const CONSENT_BUTTON   = 'button[aria-label="Consent"]';
const INPUT_SELECTOR   = '#chat-input';
const SUBMIT_SELECTOR  = '#btn-send-message';
const RESPONSE_SELECTOR = '.message-completed';
// ==============================================================================

/**
 * Wait for the response element to stop changing (streaming complete).
 * Polls every 2 s; requires 2 consecutive identical readings before returning.
 */
async function waitForStableResponse(page, timeout = 60000) {
  let previousText = '';
  let stableCount  = 0;
  const iterations = Math.floor(timeout / 2000);

  for (let i = 0; i < iterations; i++) {
    const current = await page.locator(RESPONSE_SELECTOR).last().innerText().catch(() => '');

    if (current && current === previousText) {
      stableCount++;
      if (stableCount >= 2) return current;
    } else {
      stableCount = 0;
    }

    previousText = current;
    await page.waitForTimeout(2000);
  }

  return previousText;
}

/**
 * Promptfoo provider entry point.
 * Receives an adversarial prompt, drives a real browser via Playwright,
 * and returns the chatbot's response for evaluation.
 */
module.exports = {
  async callApi(prompt, context, options) {
    const config  = options?.config ?? {};
    const timeout = config.timeout  ?? 60000;
    const headless = config.headless ?? false;   // set true for CI / no-display environments

    console.log(`[playwright] Sending prompt: ${prompt.slice(0, 60)}...`);

    let browser;
    try {
      browser = await chromium.launch({ headless });
      const page = await browser.newPage();

      // Navigate to target app
      await page.goto(WEBSITE_URL, { waitUntil: 'domcontentloaded', timeout });
      await page.waitForTimeout(2000);

      // Dismiss consent/cookie banner if present
      try {
        await page.click(CONSENT_BUTTON, { timeout: 3000 });
        await page.waitForTimeout(1000);
      } catch {
        // Banner not present — continue
      }

      // Type the adversarial prompt and submit
      await page.fill(INPUT_SELECTOR, prompt);
      await page.press(INPUT_SELECTOR, 'Enter');

      // Wait for the response element then wait for streaming to finish
      await page.waitForSelector(RESPONSE_SELECTOR, { timeout: 30000 });
      const responseText = await waitForStableResponse(page, timeout);

      if (!responseText) {
        return { error: 'No response captured from the page' };
      }

      console.log(`[playwright] Response: ${responseText.slice(0, 100)}...`);
      return { output: responseText };

    } catch (err) {
      console.error(`[playwright] Error: ${err.message}`);
      return { error: err.message };
    } finally {
      if (browser) await browser.close();
    }
  },
};
