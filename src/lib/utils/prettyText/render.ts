import type { TokenType } from "./tokenizer";
import Raw from "./Raw.svelte";
import Img from "./Img.svelte";
import Url from "./Url.svelte";
import type { LegacyComponentType } from "svelte/legacy";

export function render(tokens: TokenType[]) {
  const snippets: { component: LegacyComponentType; args: any }[] = tokens.map(
    (tokens) => {
      const { type, value } = tokens;
      switch (type) {
        case "image":
          return {
            component: Img,
            args: {
              src: value.url,
              alt: value.alt,
            },
          };
        case "plain":
          return {
            component: Raw,
            args: {
              text: value,
            },
          };
        case "url":
          return {
            component: Url,
            args: {
              url: value,
            },
          };
      }
    },
  );
  return snippets;
}
