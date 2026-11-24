import { Env } from '@stencil/core';

export const VERSION_COMMENT = ` @yooga-tecnologia/mantra v${Env.version} `;

export const insertVersionComment = (doc: Document = document): void => {
  const alreadyInserted = Array.from(doc.head.childNodes).some(
    (node) => node.nodeType === Node.COMMENT_NODE && node.nodeValue === VERSION_COMMENT,
  );
  if (!alreadyInserted) doc.head.prepend(doc.createComment(VERSION_COMMENT));
};

export default () => {
  if (typeof document !== 'undefined') insertVersionComment();
};
