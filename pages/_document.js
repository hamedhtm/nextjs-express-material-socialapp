import React from "react";
import NextDocument from "next/document";
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/core/styles";
import flush from "styled-jsx/server";

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            materialUiSheets.collect(<App {...props} />)
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
          </React.Fragment>
        ]
      };
    } finally {
      flush();
    }
  }
}
