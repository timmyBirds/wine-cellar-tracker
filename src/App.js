import React, { useState } from "react";

const SECTION_LAYOUTS = {
  Top: { areas: 6, columns: 3, rows: 9 },
  Middle: { areas: 6, columns: 2, rows: 3 },
  Bottom: { areas: 6, columns: 3, rows: 9 },
};

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Wine Cellar Tracker</h1>
      {Object.entries(SECTION_LAYOUTS).map(([name, layout]) => (
        <WineSection
          key={name}
          section={name}
          layout={layout}
          onSelect={setSelected}
        />
      ))}

      {selected && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Bottle Details</h2>
            <p><strong>Section:</strong> {selected.section}</p>
            <p><strong>Area:</strong> {selected.area + 1}</p>
            <p><strong>Column:</strong> {selected.column + 1}</p>
            <p><strong>Row:</strong> {selected.row + 1}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WineSection({ section, layout, onSelect }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{section} Section</h2>
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-6">
        {Array.from({ length: layout.areas }).map((_, i) => (
          <WineArea
            key={i}
            section={section}
            area={i}
            columns={layout.columns}
            rows={layout.rows}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function WineArea({ section, area, columns, rows, onSelect }) {
  return (
    <div className="border border-gray-300 p-1 bg-white shadow-sm">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, i) => (
          <div
            key={i}
            onClick={() =>
              onSelect({
                section,
                area,
                column: i % columns,
                row: Math.floor(i / columns),
              })
            }
            className="aspect-square bg-blue-100 hover:bg-blue-300 cursor-pointer rounded-sm"
            title={`A${area + 1} C${(i % columns) + 1} R${
              Math.floor(i / columns) + 1
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
