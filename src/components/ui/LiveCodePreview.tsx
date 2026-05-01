'use client';



interface LiveCodePreviewProps {
    html: string;
    css?: string;
    js?: string;
    className?: string;
}

export function LiveCodePreview({ html, css = '', js = '', className = '' }: LiveCodePreviewProps) {
    const srcDoc = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    ${css}
                    
                    body { 
                        margin: 0; 
                        background-color: transparent;
                    }

                    :root {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                </style>
            </head>
            <body>
                ${html}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                <script>
                    window.onerror = function(msg, url, line) {
                        document.body.innerHTML += '<div style="color:red; padding:10px; background:#ffeeee; border:1px solid red; margin:10px; rounded:4px;">Runtime Error: ' + msg + '</div>';
                    };
                    ${js}
                </script>
            </body>
        </html>
    `;

    return (
        <div className={`relative w-full rounded-xl overflow-hidden bg-white ${className}`}>
            <iframe
                title="Live Preview"
                srcDoc={srcDoc}
                className="w-full h-full border-none"
                sandbox="allow-scripts"
            />
        </div>
    );
}
