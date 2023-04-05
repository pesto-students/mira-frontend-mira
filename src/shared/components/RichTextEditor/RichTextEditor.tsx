import React from 'react';
import { InputLabel, Typography, styled } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const HelperText = styled(Typography)(({ theme }) => ({
  '&': {
    fontSize: '0.75rem',
    marginTop: '4px',
  },
  '&.helperText-error': {
    color: '#FF1943',
  },
}));

const Editor = styled(ReactQuill)(({ theme }) => ({
  '& .ql-editor': { minHeight: '180px' },
  '& h1,h2,h3,h4,h5,h6,b': {
    fontFamily: 'IBM Plex Sans !important',
  },
  '& *': { fontFamily: 'Inder' },
}));

const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
      ['link', 'video'],
    ],
  },
};

const RichTextEditor = (props, ref) => {
  const { label, value, onChange, name, helperText, error } = props;

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Editor
        ref={ref}
        value={value}
        {...quillConfig}
        onChange={(val) => {
          console.log(val.length);
          onChange({
            target: {
              name,
              value: val,
            },
          });
        }}
      />
      <HelperText className={error ? 'helperText-error' : ''}>
        {helperText}
      </HelperText>
    </>
  );
};

export default React.forwardRef(RichTextEditor);
