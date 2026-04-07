import katex from 'katex';
import 'katex/dist/katex.min.css';

export function Formula({ tex, display = false }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: display });
  return (
    <span
      style={{ fontSize: display ? '1.1em' : '1em' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
