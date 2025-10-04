// src/app/offline/page.tsx
export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <html
      dir="rtl"
      lang="fa"
      className="bg-amber-100 text-black h-screen flex items-center justify-center"
    >
      <head>
        <title>آفلاین</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              background-color: #fafafa;
              font-family: "Vazirmatn", sans-serif;
              color: #222;
            }
            .container {
              max-width: 600px;
              width: 100%;
              padding: 4rem;
              text-align: center;
              background: #fff;
              border-radius: 1rem;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            h1 {
              font-size: 3rem;
              margin-bottom: 1.5rem;
              color: #1a1a1a;
              font-weight: 800;
            }
            p {
              font-size: 1.1rem;
              margin-bottom: 2rem;
              color: #555;
            }
          `}</style>
      </head>
      <body>
        <div className="container">
          <h1>😔 آفلاین هستید</h1>
          <p>
            به نظر می رسد اینترنت شما قطع شده است. لطفاً اتصال خود را بررسی
            کنید.
          </p>
          {/* <button onClick={() => location.reload()}>تلاش مجدد</button> */}
        </div>
      </body>
    </html>
  );
}
