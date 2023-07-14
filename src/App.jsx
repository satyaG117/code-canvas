import { useEffect, useState } from 'react'
import Split from 'react-split'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import './split.css'
import CodeEditor from './components/CodeEditor';
import DropDownSelector from './components/DropDownSelector';
import useLocalStorage from './hooks/useLocalStorage';
import { editorThemes, langs } from './utils/options';


function App() {
  const [html, setHtml] = useLocalStorage('html', "<h1>Let's write some code </h1>");
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [editorTheme, setEditorTheme] = useLocalStorage('editorTheme', 'vs-dark')

  const [srcDoc, setSrcDoc] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('html')


  const handleHtmlChange = (value) => {
    setHtml(value);
  }
  const handleCssChange = (value) => {
    setCss(value);
  }
  const handleJsChange = (value) => {
    setJs(value);
  }

  const handleLanguageChange = (e) => {
    setCurrentLanguage(e.target.value)
  }

  const handleThemeChange = (e) => {
    setEditorTheme(e.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>${html}</body>
          <script>${js}</script>
        </html>
      `)
    }, 450)

    return () => clearTimeout(timeout)
  }, [html, css, js])




  return (
    <div className='main-wrapper'>
      <nav className="nav row p-2 menu-bar bg-dark">
        <div className='col-4 col-lg-9 mt-1'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="orange" class="bi bi-braces-asterisk" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C2.25 2 1.49 2.759 1.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6ZM14.886 7.9v.164c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456v-1.3c-1.114 0-1.49-.362-1.49-1.456V4.352C14.51 2.759 13.75 2 12.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6ZM7.5 11.5V9.207l-1.621 1.621-.707-.707L6.792 8.5H4.5v-1h2.293L5.172 5.879l.707-.707L7.5 6.792V4.5h1v2.293l1.621-1.621.707.707L9.208 7.5H11.5v1H9.207l1.621 1.621-.707.707L8.5 9.208V11.5h-1Z" />
          </svg>
          <strong className='app-name'> Code Canvas</strong>
        </div>
        <div className='col-4 col-lg-2'>
          <DropDownSelector
            defaultValue={currentLanguage}
            onChange={handleLanguageChange}
            options={langs}
          />
        </div>
        <div className='col-4 col-lg-1'>
          <DropDownSelector
            defaultValue={editorTheme}
            onChange={handleThemeChange}
            options={editorThemes}
          />
        </div>

      </nav>
      <div className="container-fluid main-container">

        <Split
          className='split'
          minSize={75}
        >
          <div className='editor-container'>
            {currentLanguage === 'html' && (<CodeEditor
              language="html"
              value={html}
              onChange={handleHtmlChange}
              theme={editorTheme}
            />)}
            {currentLanguage === 'css' && (<CodeEditor
              language="css"
              value={css}
              onChange={handleCssChange}
              theme={editorTheme}
            />)}
            {currentLanguage === 'javascript' && (<CodeEditor
              language="javascript"
              value={js}
              onChange={handleJsChange}
              theme={editorTheme}
            />)}
          </div>
          <div className='output-display'>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              width="100%"
              height="100%"
            />
          </div>
        </Split>
      </div>
      <footer className='bg-dark text-white'><small>src : <a href='https://github.com/satyaG117/code-canvas'>github</a></small></footer>
    </div>
  )
}

export default App