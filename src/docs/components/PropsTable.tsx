import { PropRow } from '../types';

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="docs-props uib-glass">
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code className="docs-props__name">{row.name}</code>
              </td>
              <td>
                <code className="docs-props__type">{row.type}</code>
              </td>
              <td>{row.default ? <code className="docs-props__type">{row.default}</code> : '—'}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
