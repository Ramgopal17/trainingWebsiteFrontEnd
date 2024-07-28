import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* <link rel="stylesheet" href="assets/css/custom/main.css" /> */}
        <script src="https://smtpjs.com/v3/smtp.js"></script>
        <script
          type="text/javascript"
          src="https://unpkg.com/default-passive-events"
        ></script>
        {/* <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        ></script> */}
        <script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          type="text/javascript"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/pdfkit@0.10.0/js/pdfkit.standalone.js"></script>
        <script src="https://bundle.run/blob-stream@0.1.3"></script>
        <script src="https://cdn.jsdelivr.net/npm/svg-to-pdfkit@0.1.8/source.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <Script type="text/javascript">
          {`
        function googleTranslateElementInit() {
          
            new google.translate.TranslateElement(
                {pageLanguage: 'en'},
                'google_translate_element'
            );
        }
       
        `}
        </Script> */}
      </body>
    </Html>
  );
}
