import React, { useRef, useState } from 'react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
    const inputRef = useRef();
    const [busy, setBusy] = useState(false);

    const upload = async (file) => {
        if (!file) return;
        const fd = new FormData();
        fd.append('image', file);
        setBusy(true);
        try {
            const { data } = await api.post('/uploads', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onChange(data.url);
            toast.success('Uploaded');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Upload failed');
        } finally {
            setBusy(false);
        }
    };

    return (
        <label className="full">
            {label}
            <div className="image-upload">
                {value ? (
                    <img src={value} alt="" className="preview" />
                ) : (
                    <div className="placeholder">No image</div>
                )}
                <div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => upload(e.target.files[0])}
                    />
                    <button
                        type="button"
                        className="btn ghost sm"
                        disabled={busy}
                        onClick={() => inputRef.current?.click()}
                    >
                        {busy ? 'Uploading…' : value ? 'Replace' : 'Upload'}
                    </button>
                    {value && (
                        <button
                            type="button"
                            className="btn sm"
                            style={{ marginLeft: 8, background: 'transparent', color: '#c4452d', borderColor: '#c4452d' }}
                            onClick={() => onChange('')}
                        >
                            Remove
                        </button>
                    )}
                    <div className="hint">PNG, JPG, WEBP · up to 8 MB. Or paste a URL below.</div>
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="/uploads/file.jpg or https://…"
                        style={{
                            marginTop: 8,
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid var(--line)',
                            borderRadius: 'var(--radius)',
                            fontSize: 13,
                            textTransform: 'none',
                            letterSpacing: 'normal',
                        }}
                    />
                </div>
            </div>
        </label>
    );
}
