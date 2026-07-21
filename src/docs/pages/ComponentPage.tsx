import { Navigate, useParams } from 'react-router-dom';
import { getDoc } from '../registry';
import { BookNav } from '../components/BookNav';
import { CodeBlock } from '../components/CodeBlock';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function ComponentPage() {
  const { slug } = useParams();
  const doc = slug ? getDoc(slug) : undefined;
  if (!doc) return <Navigate to="/" replace />;

  return (
    <div>
      <p className="docs-chapter-tag">Chapter {String(doc.chapter).padStart(2, '0')}</p>
      <h1 className="docs-page-title">{doc.name}</h1>
      <p className="docs-lede">{doc.tagline}</p>

      <CodeBlock code={doc.importCode} />

      <p className="docs-body-copy">{doc.description}</p>

      <h2 className="docs-section-title">Examples</h2>
      {doc.demos.map((d) => (
        <Demo key={d.title} title={d.title} description={d.description} code={d.code} scene={d.scene}>
          {d.element}
        </Demo>
      ))}

      <h2 className="docs-section-title">Props</h2>
      <PropsTable rows={doc.props} />

      <BookNav currentPath={`/components/${doc.slug}`} />
    </div>
  );
}
