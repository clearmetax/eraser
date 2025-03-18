# eraser
A JavaScript script to programmatically unfollow all accounts you're following on Twitter/X. Run this in your browser console to automate the process.

## Features
- Automatically scrolls to load all followed accounts
- Unfollows each account with random delays to mimic human behavior
- Includes error handling and logging for debugging
- Uses IntersectionObserver for efficient loading

## Usage
1. **Open Twitter**: Log into your Twitter/X account in a browser.
2. **Navigate**: Go to your profile's "Following" page (`https://x.com/yourusername/following`).
3. **Open Console**:
   - Chrome/Edge: `Ctrl + Shift + J` (Windows) or `Cmd + Option + J` (Mac)
   - Firefox: `Ctrl + Shift + E` (Windows) or `Cmd + Option + E` (Mac)
4. **Run the Script**:
   - Copy the entire contents of `src/unfollow-all.js`.
   - Paste it into the console and press `Enter`.
5. **Monitor Progress**: Watch the console for logs like "Unfollowed account #X".

## Installation
- **Clone or Download**: Get this repository from GitHub.
- **Copy Script**: Open `src/unfollow-all.js` in a text editor, copy the code, and follow the usage steps above.

## Notes
- **Rate Limits**: Twitter may block rapid unfollows. The script includes delays, but adjust them (e.g., increase `1000 + Math.random() * 2000`) if needed.
- **UI Changes**: If Twitter updates its interface, the selectors (`data-testid="UserCell"`, etc.) might need updating.
- **Risk**: Use at your own risk—mass unfollowing might violate Twitter's terms of service.

## Debugging
- Check console logs for errors.
- If no accounts are found, inspect the page (right-click > Inspect) to verify `data-testid="UserCell"` still applies.

## Contributing
Feel free to fork, submit issues, or send pull requests with improvements!

## License
MIT License - see [LICENSE](LICENSE) for details.

## Disclaimer
This tool is for educational purposes only. The author is not responsible for any account restrictions resulting from its use.
