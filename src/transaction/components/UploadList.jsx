import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
const MAX_SIZE = 20 * 1024 * 1024

export default function UploadList({ files, onChange }) {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const handleFiles = (fileList) => {
    const next = [...files]
    for (const file of fileList) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        window.alert(t('errors.uploadType'))
        continue
      }
      if (file.size > MAX_SIZE) {
        window.alert(t('errors.uploadSize'))
        continue
      }
      if (next.some((f) => f.name === file.name)) continue
      next.push({ name: file.name, size: file.size, status: 'uploaded' })
    }
    onChange(next)
  }

  const removeFile = (name) => {
    onChange(files.filter((f) => f.name !== name))
  }

  return (
    <div className="upload-list">
      <div className="upload-dropzone">
        <p>{t('upload.hint')}</p>
        <button
          type="button"
          className="btn secondary upload-trigger"
          onClick={() => inputRef.current?.click()}
        >
          {t('upload.choose')}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>
      {files.length === 0 ? (
        <p className="hint-text">{t('upload.empty')}</p>
      ) : (
        files.map((file) => (
          <div className="upload-item" key={file.name}>
            <span>{file.name}</span>
            <div className="upload-item-actions">
              <em>{t('upload.status')}</em>
              <button type="button" className="btn-link" onClick={() => removeFile(file.name)}>
                {t('upload.remove')}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
