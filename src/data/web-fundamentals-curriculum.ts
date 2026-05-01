export const WEB_FUNDAMENTALS_CURRICULUM = {
    "web-fundamentals": {
        fileName: "web-fundamentals",
        description: "Web Fundamentals & Performance",
        category: "Web Fundamentals",
        subDescription: "Master how the web works, from HTTP protocols to browser rendering, security, and performance optimization.",
        phases: [
            {
                phase: 1,
                title: "The Big Picture: Frontend, Backend, & Fullstack",
                theory: [
                    "The Restaurant Analogy: How a website is like a dining experience",
                    "The Dining Area (Frontend): What the customer sees and touches",
                    "The Kitchen (Backend): Where the heavy lifting and cooking happens",
                    "The Manager (Database): Keeping track of orders and ingredients",
                    "Fullstack: Understanding the whole 'Restaurant' operation"
                ],
                practicals: [
                    "Reverse Engineer: Look at a site like Netflix and list what is 'Dining Area' vs 'Kitchen'",
                    "Role Play: Explain to a friend why a website needs a 'Kitchen' (Backend)",
                    "Project: 'The Dream App Map' - Sketch out the Front, Back, and DB of your own app idea"
                ]
            },
            {
                phase: 2,
                title: "The Digital Postman: The Internet & Servers",
                theory: [
                    "The Information Highway: How data travels across cables and air",
                    "The Server: A computer that never sleeps and only 'Serves' others",
                    "The Client: Your phone or laptop 'Requesting' a service",
                    "Data Centers: The giant libraries where servers live",
                    "Cloud Computing: Why 'The Cloud' is just someone else's computer"
                ],
                practicals: [
                    "Server Search: Find out where your favorite app's servers are likely located",
                    "The Speed Test: Measure how long it takes for a 'Postman' to reach a server across the world",
                    "Project: 'The World Trip' - Trace a digital packet from your home to a server in another country"
                ]
            },
            {
                phase: 3,
                title: "The Phonebook of the Web: DNS & IP",
                theory: [
                    "IP Addresses: The 'Home Address' of every computer on earth",
                    "DNS: The digital phonebook that turns names (Google.com) into numbers",
                    "Domain Names: Why we buy '.com' names instead of memorizing digits",
                    "Nameservers: The librarians who know where every site lives",
                    "Propagation: Why it takes time for a new site to 'Show up' everywhere"
                ],
                practicals: [
                    "The Address Lookup: Use the terminal to find the 'Home Address' (IP) of Google.com",
                    "Domain Hunt: Search for an available domain name for your future brand",
                    "Project: 'The Address Card' - Create a mapping of 5 famous websites to their IP addresses"
                ]
            },
            {
                phase: 4,
                title: "The Request & Response: HTTP Basics",
                theory: [
                    "HTTP: The language of 'Please' and 'Thank You'",
                    "The Request: Sending an order to the kitchen",
                    "The Response: The kitchen bringing the food back to your table",
                    "Methods: GET (Can I have...?) vs POST (Here is my info...)",
                    "Headers: The 'Extra Instructions' (e.g., 'I want this in English')"
                ],
                practicals: [
                    "DevTools Peek: Open the 'Network' tab and watch the requests fly as you refresh a page",
                    "The Header Check: Identify which language a server thinks you prefer using headers",
                    "Project: 'The Order Form' - Write a mock request for a 'Cheese Pizza' in HTTP format"
                ]
            },
            {
                phase: 5,
                title: "The Secret Code: HTTPS & SSL",
                theory: [
                    "The Problem: People 'Eavesdropping' on your digital conversation",
                    "The Solution: HTTPS (The Locked Suitcase analogy)",
                    "Encryption: Scrambling the message so only the receiver can read it",
                    "SSL/TLS Certificates: The 'ID Card' that proves a site is who they say they are",
                    "The Green Lock: Why the browser warns you when a site is 'Not Secure'"
                ],
                practicals: [
                    "Security Audit: Find 3 sites with a lock icon and check who issued their security 'ID Card'",
                    "The Man-in-the-Middle: Explain how a hacker could read a 'Plain' HTTP message",
                    "Project: 'The Digital Seal' - Write a simple 'Secret Message' and 'Encrypt' it using a manual key"
                ]
            },
            {
                phase: 6,
                title: "The HTTP Status Code Story",
                theory: [
                    "Status Codes: The short codes the kitchen sends back to the waiter",
                    "200 OK: 'Everything is fine, here is your food'",
                    "404 Not Found: 'We don't have that on the menu'",
                    "500 Server Error: 'The kitchen is on fire!'",
                    "301 Redirect: 'We moved to a new building down the street'"
                ],
                practicals: [
                    "The 404 Hunt: Intentionally visit a broken URL on a site and see their custom error page",
                    "Status Search: Use an API to see the status code returned when you ask for something",
                    "Project: 'The Status Map' - Create a visual guide for the 5 most common status codes using emojis"
                ],
                games: [
                    {
                        title: "HTTP Cat",
                        url: "https://http.cat/",
                        description: "Learn status codes with the help of funny feline friends."
                    }
                ]
            },
            {
                phase: 7,
                title: "The Browser's Secret Work: Rendering Pipeline",
                theory: [
                    "The Painter Analogy: How the browser turns code into a beautiful picture",
                    "DOM Construction: Building the skeleton of the page",
                    "CSSOM Construction: Applying the skin and colors",
                    "The Critical Path: The sequence of events before you see anything",
                    "Reflow vs. Repaint: Why changing the 'Skeleton' is harder than changing the 'Color'"
                ],
                practicals: [
                    "Performance Profile: Use DevTools to see how long it takes a browser to 'Paint' a page",
                    "The Layout Shift: Find a site that 'Jumps' as it loads and identify why",
                    "Project: 'The Loading Sequence' - Draw a comic strip of a browser getting HTML and turning it into a site"
                ]
            },
            {
                phase: 8,
                title: "The API Interface: Talking to other Apps",
                theory: [
                    "What is an API? (The waiter taking your order to another restaurant)",
                    "Endpoints: The specific 'Address' where you ask for data",
                    "JSON: The universal language for data (The 'Order Ticket')",
                    "Third-Party APIs: Using Google Maps, Weather, or Spotify in your app",
                    "REST: The 'Standard Rules' of how APIs should behave"
                ],
                practicals: [
                    "The API Explorer: Use a site like Public APIs to find 3 cool data sources",
                    "JSON Parser: Look at a raw JSON file and identify the 'Keys' and 'Values'",
                    "Project: 'The App Connection' - List 3 apps you use and guess which APIs they might be using"
                ]
            },
            {
                phase: 9,
                title: "Secure Doors: CORS & Same-Origin",
                theory: [
                    "The Gatekeeper: Why browsers are suspicious of other websites",
                    "CORS: Asking for permission to talk to a different server",
                    "The Same-Origin Policy: 'You can only talk to people in your own house'",
                    "Preflight Requests: The 'Knock before you enter' rule",
                    "Configuring the Gate: How developers tell the server who to trust"
                ],
                practicals: [
                    "The Blocked Request: Try to fetch data from a site that doesn't allow it and see the CORS error",
                    "CORS Solution: Use a 'Proxy' or headers to solve a simple connection issue",
                    "Project: 'The Trusted Guest List' - Write a mock configuration that allows only 'MyFriend.com' to access your data"
                ]
            },
            {
                phase: 10,
                title: "The ID Card: Authentication vs. Authorization",
                theory: [
                    "The Building Analogy: Entering the building vs. entering the safe",
                    "Authentication: 'Who are you?' (Passport check)",
                    "Authorization: 'What are you allowed to do?' (Keycard check)",
                    "The Session: Remembering who you are after you log in",
                    "Social Login: Why 'Login with Google' is more secure than a password"
                ],
                practicals: [
                    "Login Audit: List 5 sites and check if they use 'Social Login' or their own 'Passport' system",
                    "The Permission Test: Try to access a page on a site you aren't logged into",
                    "Project: 'The VIP System' - Design a permission table for a 'Library' app (Member vs. Librarian)"
                ]
            },
            {
                phase: 11,
                title: "The Digital Cookie: Cookies & Sessions",
                theory: [
                    "The Cookie: A tiny piece of 'Memory' the site leaves on your computer",
                    "Session vs. Persistent: Cookies that die when you leave vs. those that stay",
                    "The Shopping Cart: How a site remembers what you picked even if you refresh",
                    "Privacy: Why sites have to ask you to 'Accept Cookies'",
                    "Security: The `HttpOnly` rule (Keeping the 'Memory' safe from hackers)"
                ],
                practicals: [
                    "Cookie Jar: Use DevTools to find and delete a cookie from a site, then refresh and see what happens",
                    "The Cart Test: Add an item to a cart, close the tab, and see if it's still there",
                    "Project: 'The Memory Tracker' - List 3 things a site 'Remembers' about you using cookies"
                ]
            },
            {
                phase: 12,
                title: "Modern Keys: JWT & Tokens",
                theory: [
                    "The Wristband: The modern alternative to a session (The Concert Analogy)",
                    "JWT (JSON Web Token): A digital, tamper-proof ticket you carry with you",
                    "The Structure: Header (The Type), Payload (The Info), and Signature (The Seal)",
                    "Stateless: Why tokens are better for big apps with millions of users",
                    "Expiration: Why some 'Wristbands' stop working after 24 hours"
                ],
                practicals: [
                    "Token Decode: Paste a mock JWT into `jwt.io` and see the hidden information inside",
                    "The Life Cycle: Explain why a site asks you to log in again after a week",
                    "Project: 'The Digital Ticket' - Create a mock 'Payload' for a cinema ticket using JSON format"
                ]
            },
            {
                phase: 13,
                title: "Web Security: XSS & CSRF Tricksters",
                theory: [
                    "XSS (Cross-Site Scripting): Someone injecting 'Bad Code' into your site",
                    "CSRF (Cross-Site Request Forgery): Someone 'Tricking' you into clicking a link",
                    "Input Sanitization: Why we must 'Wash' everything a user types",
                    "Tokens: The 'Secret Handshake' that prevents forgery",
                    "Validation: Never trusting the user until you've checked their 'Suitcase'"
                ],
                practicals: [
                    "The Script Injector: Explain how a hacker could put an 'Alert' box on your profile",
                    "The Fake Link: Describe a scenario where a link says 'Win Money' but actually 'Deletes Account'",
                    "Project: 'The Security Shield' - Write 5 rules for a contact form to keep 'Tricksters' out"
                ]
            },
            {
                phase: 14,
                title: "The Speed Merchant: Performance Matters",
                theory: [
                    "The 3-Second Rule: Why people leave a site if it's slow",
                    "Bandwidth vs Latency: Road width vs Speed limit",
                    "The 'Heavy' Website: Why HD images and big scripts are the enemy of speed",
                    "Measuring Success: Introduction to performance metrics",
                    "Lighthouse: The 'Report Card' for your website"
                ],
                practicals: [
                    "The Audit: Run a Lighthouse test on your favorite site and check their 'Performance' grade",
                    "The Mobile Test: See how a site performs when you simulate a 'Slow 3G' connection",
                    "Project: 'The Speed Report' - Identify 3 slow sites and suggest one reason why they are lagging"
                ]
            },
            {
                phase: 15,
                title: "Core Web Vitals: The Dr.'s Checkup",
                theory: [
                    "LCP (Largest Contentful Paint): 'How fast do the big things show up?'",
                    "FID (First Input Delay): 'How fast can I click things?'",
                    "CLS (Cumulative Layout Shift): 'Does the page jump around?'",
                    "The User Experience: Why Google uses these 'Vitals' to rank your site",
                    "Thresholds: What counts as 'Good', 'Needs Improvement', and 'Poor'"
                ],
                practicals: [
                    "Vitals Hunt: Use the 'Web Vitals' extension to see the LCP and CLS of a live site",
                    "The Jitter Test: Find a site with high CLS (jumping elements) and record it",
                    "Project: 'The Health Dashboard' - Create a scorecard for your portfolio site's Web Vitals"
                ]
            },
            {
                phase: 16,
                title: "Image Magic: Optimization",
                theory: [
                    "The Weight of Pixels: Why a 5MB image is a disaster",
                    "Modern Formats: WebP and AVIF (The 'Lightweight' champions)",
                    "Lazy Loading: 'Don't load it until the user scrolls to it'",
                    "Responsive Images: Sending small images to small phones and big images to big TVs",
                    "Compression: Shrinking the file size without losing the beauty"
                ],
                practicals: [
                    "The Converter: Take a heavy JPG and convert it to WebP, then compare the size",
                    "Lazy Inspection: Watch the 'Network' tab to see images load only as you scroll down",
                    "Project: 'The Optimizers' Checklist' - List 5 ways to make a photo-heavy gallery load instantly"
                ]
            },
            {
                phase: 17,
                title: "Caching: The Shortcut",
                theory: [
                    "Caching: 'If you've done the work once, remember it'",
                    "Browser Cache: Storing the 'Logo' so you don't download it on every page",
                    "CDN (Content Delivery Network): Keeping a copy of your site in every city on earth",
                    "Cache-Control: Telling the browser 'Keep this for a year' or 'Check every time'",
                    "Invalidation: The hardest problem (How to tell the browser 'I changed the file!')"
                ],
                practicals: [
                    "The CDN Search: Find out which CDN (Cloudflare, Akamai, etc.) is hosting a major news site",
                    "Cache Header Peek: Find the `Cache-Control` header on an image from Google Images",
                    "Project: 'The Shortcut Map' - Draw a diagram showing how a CDN makes a site faster for someone in Japan"
                ]
            },
            {
                phase: 18,
                title: "PWAs: The Best of Both Worlds",
                theory: [
                    "PWA (Progressive Web App): A website that thinks it's an app",
                    "Manifest: The file that tells your phone 'This site has an icon and a splash screen'",
                    "Offline Mode: How a site works even when the internet dies (The 'Worker' analogy)",
                    "Push Notifications: Sending alerts to users without an App Store",
                    "The Service Worker: The 'Middleman' who manages your data in the background"
                ],
                practicals: [
                    "PWA Install: Find a site with an 'Install' icon and see it show up on your homescreen",
                    "The Offline Test: Turn off your Wi-Fi and see if a PWA (like Pinterest or Twitter) still shows content",
                    "Project: 'The App Blueprint' - Design a homescreen icon and splash screen for your own PWA"
                ]
            },
            {
                phase: 19,
                title: "Real-time Web: The Walkie-Talkie",
                theory: [
                    "Polling: 'Are we there yet? Are we there yet?' (The annoying way)",
                    "WebSockets: A 'Live Link' that stays open forever (The Walkie-Talkie)",
                    "Use Cases: Chat apps, Stock prices, and Multiplayer games",
                    "Binary Data: Sending more than just text for high-speed action",
                    "Bi-directional: Both the server and client can 'Start' the conversation"
                ],
                practicals: [
                    "The Live Chat: Open a chat app and watch the Network tab—notice how it doesn't 'Refresh' to see new messages",
                    "Socket Test: Use a public WebSocket testing site to send and receive a live ping",
                    "Project: 'The Real-Time Plan' - List 3 features in an app that REQUIRE a 'Walkie-Talkie' (WebSocket)"
                ]
            },
            {
                phase: 20,
                title: "The Future of the Web: HTTP/3 & Beyond",
                theory: [
                    "HTTP/1 vs HTTP/2: Moving from one lane to a highway",
                    "HTTP/3: Sending data over 'UDP' for ultra-speed (The 'Rocket' protocol)",
                    "WebAssembly: Running 'Super-Fast' code (like video games) in the browser",
                    "The Decentralized Web: What's next for how we share information",
                    "Sustainability: Why green hosting and light code matter for the planet"
                ],
                practicals: [
                    "Protocol Check: Use a browser tool to see if the sites you visit are using HTTP/1, 2, or 3",
                    "WASM Demo: Try a web-based video editor or game and notice how fast it runs",
                    "Project: 'The Web 2030 Vision' - Write a short paragraph on how we will use the internet in 10 years"
                ]
            }
        ]
    }
};
