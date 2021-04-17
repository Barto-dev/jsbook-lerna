import React, {useRef, useEffect} from 'react';
import './preview.css'

interface PreviewProps {
    code: string,
    bundlingErr: string
}

const html = `
<html>
<style>
html {
background-color:#fff;
}
</style>
<head></head>
<body>
<div id="root"></div>
<script>
const handleError = (err) => {
     const root = document.querySelector('#root');
    root.innerHTML = '<div style="color:red;"><h4>' + err + '</h4></div>';
    console.error(err);
}

window.addEventListener('error', (evt) => {
  evt.preventDefault();
  handleError(evt.error)
})

// Если мы обрабатываем ошибку в блоке try catch то событие error не вызывается
window.addEventListener('message', (evt) => {
  try {
    eval(evt.data);
  } catch (err) {
    handleError(err)
  }
  
  }, false)
</script>
</body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({code,bundlingErr}) => {
    const iframe = useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*')
        }, 50)
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                className="preview"
                title="preview"
                ref={iframe}
                sandbox="allow-scripts"
                srcDoc={html} />
            {bundlingErr && <div className="preview-error">{bundlingErr}</div>}
        </div>
    );
};

export default Preview;
