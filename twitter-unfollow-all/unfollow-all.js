// unfollow-all.js
// Script to programmatically unfollow all accounts on Twitter/X
// Author: [Your Name or Handle]
// Date: March 18, 2025

(async function unfollowAll() {
    // Wait for an element to appear in the DOM
    const waitForElement = (selector) => {
        return new Promise(resolve => {
            const checkElement = () => {
                const element = document.querySelector(selector);
                if (element) resolve(element);
                else setTimeout(checkElement, 100);
            };
            checkElement();
        });
    };

    // Delay function to mimic human behavior and avoid rate limits
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Load all following accounts using IntersectionObserver
    async function loadAllFollowing() {
        return new Promise(async (resolve) => {
            console.log('Starting to load following...');
            const cells = document.querySelectorAll('[data-testid="UserCell"]');
            if (cells.length === 0) {
                console.log('No UserCell elements found initially');
                resolve();
                return;
            }

            const target = cells[cells.length - 1];
            let lastLoadedCount = cells.length;
            console.log(`Initial count: ${lastLoadedCount}`);

            const observer = new IntersectionObserver(async (entries) => {
                if (entries[0].isIntersecting) {
                    const currentCount = document.querySelectorAll('[data-testid="UserCell"]').length;
                    console.log(`Current count: ${currentCount}, Last count: ${lastLoadedCount}`);
                    if (currentCount === lastLoadedCount) {
                        console.log('No more accounts loaded, finishing...');
                        observer.disconnect();
                        resolve();
                    } else {
                        lastLoadedCount = currentCount;
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                }
            }, { threshold: 0.1 });

            observer.observe(target);
            window.scrollTo(0, document.body.scrollHeight);

            // Fallback timeout after 10 seconds
            setTimeout(() => {
                console.log('Timeout reached, forcing resolve...');
                observer.disconnect();
                resolve();
            }, 10000);
        });
    }

    try {
        // Ensure we're on the following page
        if (!window.location.href.includes('/following')) {
            console.log('Navigating to following page...');
            window.location.href = `${window.location.origin}/${window.location.pathname.split('/')[1]}/following`;
            await delay(3000);
        }

        console.log('Loading all accounts...');
        await loadAllFollowing();

        // Find all unfollow buttons
        const followButtons = document.querySelectorAll('[data-testid="UserCell"] button[role="button"]');
        console.log(`Found ${followButtons.length} accounts to unfollow`);

        if (followButtons.length === 0) {
            console.log('No follow buttons found. Check if you’re on the right page or if Twitter UI changed.');
            return;
        }

        let unfollowCount = 0;
        for (const button of followButtons) {
            if (button.textContent.includes('Following')) {
                try {
                    console.log('Clicking unfollow button...');
                    button.click();
                    await delay(500);

                    const confirmButton = await waitForElement('[data-testid="confirmationSheetConfirm"]');
                    console.log('Confirming unfollow...');
                    confirmButton.click();

                    unfollowCount++;
                    console.log(`Unfollowed account #${unfollowCount}`);
                    await delay(1000 + Math.random() * 2000); // Random delay 1-3s
                } catch (error) {
                    console.log('Error unfollowing:', error);
                    await delay(1000);
                    continue;
                }
            }
        }

        console.log(`Finished! Unfollowed ${unfollowCount} accounts`);
    } catch (error) {
        console.error('Script failed:', error);
    }
})();