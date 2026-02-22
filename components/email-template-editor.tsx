// components/email-template-editor.tsx
'use client';
import { useState } from 'react';

interface EmailTemplateEditorProps {
  onSave: (template: { name: string; subject: string; body: string }) => void;
}

export function EmailTemplateEditor({ onSave }: EmailTemplateEditorProps) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, subject, body });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Hello {{name}} from {{company}}"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded"
          placeholder="Dear {{name}}, we noticed you work at {{company}} as {{position}}..."
          required
        />
      </div>
      
      <div className="text-sm text-gray-600">
        <p>Available variables: {"{{name}}"} {"{{company}}"} {"{{position}}"} {"{{email}}"}</p>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Template
      </button>
    </form>
  );
}