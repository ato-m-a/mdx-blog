import type { RehypeRewriteOptions } from 'rehype-rewrite';

const nestedParagraphRewrite: RehypeRewriteOptions['rewrite'] = (node) => {
  if (node.type === 'mdxJsxFlowElement' && node.name === 'p') {
    if (node.children && node.children.length) {
      if (node.children[0].type === 'element' && node.children[0].tagName === 'p') {
        node.children[0] = node.children[0].children[0];
      }
    }
  }
};

export default nestedParagraphRewrite;
