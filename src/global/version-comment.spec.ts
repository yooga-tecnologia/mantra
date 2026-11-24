jest.mock('@stencil/core', () => ({
  ...jest.requireActual('@stencil/core'),
  Env: { version: '9.9.9' },
}));

import { VERSION_COMMENT, insertVersionComment } from './version-comment';

const getVersionComments = () =>
  Array.from(document.head.childNodes).filter(
    (node) => node.nodeType === Node.COMMENT_NODE && node.nodeValue === VERSION_COMMENT,
  );

describe('insertVersionComment', () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta charset="utf-8">';
  });

  it('builds the comment from the package version', () => {
    expect(VERSION_COMMENT).toBe(' @yooga-tecnologia/mantra v9.9.9 ');
  });

  it('prepends the version comment to the document head', () => {
    insertVersionComment();

    expect(document.head.firstChild.nodeType).toBe(Node.COMMENT_NODE);
    expect(document.head.firstChild.nodeValue).toBe(VERSION_COMMENT);
  });

  it('does not duplicate the comment when called more than once', () => {
    insertVersionComment();
    insertVersionComment();

    expect(getVersionComments()).toHaveLength(1);
  });
});
