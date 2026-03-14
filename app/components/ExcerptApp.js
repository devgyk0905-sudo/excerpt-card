'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'

const SIZES = [14, 16, 18, 20, 22]
const COLORS = [
  { id: 'black', hex: '#111111' },
  { id: 'white', hex: '#ffffff' },
  { id: 'c1',  hex: '#C8D8E8' }, { id: 'c2',  hex: '#E8D5C0' }, { id: 'c3',  hex: '#D5E8D8' },
  { id: 'c4',  hex: '#E8D5E0' }, { id: 'c5',  hex: '#ECE8F5' }, { id: 'c6',  hex: '#F5F0E8' },
  { id: 'c7',  hex: '#E8F0E8' }, { id: 'c8',  hex: '#F5E8E8' }, { id: 'c9',  hex: '#E8EEF5' },
  { id: 'c10', hex: '#FDF6E3' }, { id: 'd1',  hex: '#1A2540' }, { id: 'd2',  hex: '#2C2C2C' },
  { id: 'd3',  hex: '#3D2C1E' }, { id: 'd4',  hex: '#0D2418' },
]
const MAIN_FONTS = [
  { id: 'pretendard', label: '프리텐다드', css: "'프리텐다드', sans-serif" },
  { id: 'kopub',      label: 'KoPub바탕',  css: "'KoPub바탕', serif" },
  { id: 'ridi',       label: '리디바탕',   css: "'리디바탕', serif" },
  { id: 'bongodic',   label: '본고딕',     css: "'본고딕', sans-serif" },
]
const MORE_FONTS = [
  { group: '바탕·명조', fonts: [
    { id: 'kopubdot', label: 'KoPub돋음',    css: "'KoPub돋음', serif" },
    { id: 'nanum-m',  label: '나눔명조',     css: "'나눔명조', serif" },
    { id: 'bon-m',    label: '본명조',       css: "'본명조', serif" },
    { id: 'maru',     label: '마루부리',     css: "'마루부리', serif" },
    { id: 'bukku-m',  label: '부크크명조',   css: "'부크크명조', serif" },
    { id: 'eulyu',    label: '을유1945',     css: "'을유1945', serif" },
    { id: 'eunba',    label: '은바탕',       css: "'은바탕', serif" },
    { id: 'iropke',   label: '이롭게바탕',   css: "'이롭게바탕', serif" },
    { id: 'gg-ba',    label: '경기청년바탕', css: "'경기청년바탕', serif" },
  ]},
  { group: '고딕·돋음', fonts: [
    { id: 'nanum-g',  label: '나눔고딕',   css: "'나눔고딕', sans-serif" },
    { id: 'square',   label: '나눔스퀘어', css: "'나눔스퀘어', sans-serif" },
    { id: 'bukku-g',  label: '부크크고딕', css: "'부크크고딕', sans-serif" },
    { id: 'wanted',   label: '원티드산스', css: "'원티드산스', sans-serif" },
    { id: 'cinema',   label: 'a시네마체',  css: "'a시네마체', sans-serif" },
  ]},
]

// 정렬 아이콘 라인 정의
const ALIGN_LINES = {
  left: [
    { width: '100%' },
    { width: '55%', marginRight: 'auto' },
    { width: '80%', marginRight: 'auto' },
  ],
  center: [
    { width: '100%' },
    { width: '55%', marginLeft: 'auto', marginRight: 'auto' },
    { width: '100%' },
  ],
  right: [
    { width: '100%' },
    { width: '55%', marginLeft: 'auto' },
    { width: '80%', marginLeft: 'auto' },
  ],
}

export default function ExcerptApp() {
  const [body,       setBody]      = useState('')
  const [title,      setTitle]     = useState('')
  const [author,     setAuthor]    = useState('')
  const [ratio,      setRatio]     = useState('r11')
  const [bgColor,    setBgColor]   = useState('#C8D8E8')
  const [bgImage,    setBgImage]   = useState(null)
  const [selColor,   setSelColor]  = useState('c1')
  const [fontCss,    setFontCss]   = useState("var(--font-noto-sans), 'Noto Sans KR', sans-serif")
  const [activeFont, setActiveFont]= useState('pretendard')
  const [fontSize,   setFontSize]  = useState(1)
  const [tc,         setTc]        = useState('dark')
  const [align,      setAlign]     = useState('left')
  const [optOpen,    setOptOpen]   = useState(false)
  const [moreOpen,   setMoreOpen]  = useState(false)
  const [isDark,     setIsDark]    = useState(false)
  const [modalImg,   setModalImg]  = useState(null)
  const [bgBlur,     setBgBlur]    = useState(false)

  const previewRef  = useRef(null)
  const textareaRef = useRef(null)
  const dragState   = useRef({})

  const tcMain   = tc === 'dark' ? '#111111' : '#ffffff'
  const tcAuthor = tc === 'dark' ? 'rgba(17,17,17,0.75)' : 'rgba(255,255,255,0.75)'

  const autoResize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }, [])

  // localStorage 복원
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const saved = localStorage.getItem('excerptOptions')
      if (!saved) return
      const o = JSON.parse(saved)
      if (o.ratio)            setRatio(o.ratio)
      if (o.bgColor)          setBgColor(o.bgColor)
      if (o.fontCss)          setFontCss(o.fontCss)
      if (o.activeFont)       setActiveFont(o.activeFont)
      if (o.fontSize != null) setFontSize(o.fontSize)
      if (o.tc)               setTc(o.tc)
      if (o.align)            setAlign(o.align)
      if (o.isDark != null)   setIsDark(o.isDark)
      if (o.selColor != null) setSelColor(o.selColor)
      if (o.bgBlur != null)   setBgBlur(o.bgBlur)
    } catch {}
  }, [])

  // localStorage 저장
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      localStorage.setItem('excerptOptions', JSON.stringify({
        ratio, bgColor, fontCss, activeFont, fontSize, tc, align, isDark, selColor, bgBlur
      }))
    } catch {}
  }, [ratio, bgColor, fontCss, activeFont, fontSize, tc, align, isDark, selColor, bgBlur])

  useEffect(() => { autoResize() }, [body, autoResize])

  /* ── PC 가로 드래그 스크롤 ── */
  const onDragStart = (key, e) => {
    dragState.current[key] = { isDown: true, startX: e.pageX, scrollLeft: e.currentTarget.scrollLeft }
  }
  const onDragEnd = (key) => {
    if (dragState.current[key]) dragState.current[key].isDown = false
  }
  const onDragMove = (key, e) => {
    const d = dragState.current[key]
    if (!d || !d.isDown) return
    e.preventDefault()
    e.currentTarget.scrollLeft = d.scrollLeft - (e.pageX - d.startX)
  }
  const dragProps = (key) => ({
    onMouseDown:  e => onDragStart(key, e),
    onMouseLeave: () => onDragEnd(key),
    onMouseUp:    () => onDragEnd(key),
    onMouseMove:  e => onDragMove(key, e),
  })

  const handleBgImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setBgImage(URL.createObjectURL(file))
    setSelColor(null)
  }

  const previewBg = bgImage ? `url(${bgImage}) center/cover no-repeat` : bgColor

  async function doExport() {
    const { default: html2canvas } = await import('html2canvas')
    return html2canvas(previewRef.current, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: null })
  }

  async function saveImage() {
    try {
      const canvas = await doExport()
      const a = document.createElement('a')
      a.download = 'excerpt-card.png'
      a.href = canvas.toDataURL()
      a.click()
    } catch(e) { alert('저장 오류: ' + e.message) }
  }

  async function copyImage() {
    try {
      const canvas = await doExport()
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const makeJpeg = () => {
        const off = document.createElement('canvas')
        off.width = canvas.width; off.height = canvas.height
        const ctx = off.getContext('2d')
        ctx.fillStyle = bgColor || '#ffffff'
        ctx.fillRect(0, 0, off.width, off.height)
        ctx.drawImage(canvas, 0, 0)
        return off.toDataURL('image/jpeg', 0.95)
      }
      if (isMobile) {
        setModalImg(makeJpeg())
      } else {
        canvas.toBlob(async blob => {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            const btn = document.getElementById('copy-btn')
            btn.textContent = '복사됨 ✓'
            setTimeout(() => { btn.textContent = '복사하기' }, 1500)
          } catch {
            setModalImg(makeJpeg())
          }
        })
      }
    } catch(e) { alert('오류: ' + e.message) }
  }

  const ratioClass = { r11: '1/1', r34: '3/4', r916: '9/16' }

  /* ── 스타일 변수 ── */
  const t1   = isDark ? '#E8E6E2' : '#1a1a1a'
  const bg   = isDark ? '#161616' : '#F5F3EF'
  const card = isDark ? '#222222' : '#ffffff'
  const bdr  = isDark ? '#3a3a3a' : '#E2E0DC'
  const t3   = isDark ? '#555555' : '#C0BEBB'
  const sub  = isDark ? 'rgba(232,230,226,0.72)' : 'rgba(26,26,26,0.72)'
  const sans = "var(--font-noto-sans), 'Noto Sans KR', sans-serif"

  const s = {
    wrap:        { minHeight: '100vh', background: bg, display: 'flex', justifyContent: 'center', transition: 'background .3s' },
    panel:       { width: '100%', maxWidth: 420, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: bg, borderLeft: `0.5px solid ${bdr}`, borderRight: `0.5px solid ${bdr}` },
    topBar:      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 10px' },
    appTitle:    { fontSize: 13, fontWeight: 400, color: t3, letterSpacing: '0.04em', fontFamily: sans },
    darkBtn:     { background: 'none', border: `0.5px solid ${bdr}`, borderRadius: 20, padding: '4px 10px', fontSize: 11, color: sub, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: sans },
    // ── 미리보기: previewWrap에 좌우 padding으로 여백 확보 ──
    previewWrap: { flexShrink: 0, padding: '0 18px 12px' },
    previewBox:  { width: '100%', aspectRatio: ratioClass[ratio], borderRadius: 0, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 28px' },
    pvBody:      { fontSize: SIZES[fontSize - 1], lineHeight: 1.8, marginBottom: 12, whiteSpace: 'pre-line', color: tcMain, textAlign: align, fontFamily: fontCss, wordBreak: 'keep-all', transition: 'all .2s' },
    pvTitle:     { fontFamily: sans, fontSize: 13, fontWeight: 400, marginBottom: 3, color: tcMain, textAlign: align },
    pvAuthor:    { fontFamily: sans, fontSize: 12, fontWeight: 300, color: tcAuthor, textAlign: align },
    saveRow:     { display: 'flex', gap: 8, padding: '0 18px 14px', flexShrink: 0 },
    btnCopy:     { flex: 1, borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: sans, background: card, border: `0.5px solid ${bdr}`, color: t1 },
    btnSave:     { flex: 1, borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: sans, background: t1, border: 'none', color: bg },
    scrollArea:  { flex: 1, overflowY: 'auto', padding: '4px 18px 0' },
    lv1:         { fontSize: 13, fontWeight: 400, color: t1, fontFamily: sans },
    lv2:         { fontSize: 12, fontWeight: 400, color: sub, fontFamily: sans, paddingLeft: 2 },
    inputField:  { width: '100%', border: `0.5px solid ${bdr}`, borderRadius: 9, padding: '7px 11px', fontSize: 13, color: t1, background: isDark ? '#2a2a2a' : '#fff', fontFamily: sans, outline: 'none', resize: 'none' },
    divider:     { height: 1, background: isDark ? '#444' : '#D8D6D2', margin: '8px 0 12px' },
    hScroll:     { display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 3, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab', userSelect: 'none' },
    segBtn: (active) => ({
      flex: 'none', padding: '5px 14px',
      border: `0.5px solid ${active ? t1 : bdr}`,
      borderRadius: 8, fontSize: 12,
      color: active ? bg : sub,
      background: active ? t1 : card,
      cursor: 'pointer', fontFamily: sans, textAlign: 'center',
    }),
    
    fontBtn: (active) => ({
      border: `0.5px solid ${active ? t1 : bdr}`,
      borderRadius: 7, padding: '6px 11px', fontSize: 13,
      color: active ? bg : sub,
      background: active ? t1 : card,
      cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: sans, flexShrink: 0,
    }),
    fontMoreBtn: { border: '0.5px solid #DADADA', borderRadius: 7, padding: '5px 8px', fontSize: 11, color: '#DADADA', background: isDark ? '#1e1e1e' : '#FAFAF8', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: sans },
    copyright:   { textAlign: 'center', fontSize: 9, color: '#969696', padding: '40px 0 20px', fontFamily: sans },
  }

  const lineColor = (active) => active ? (isDark ? '#161616' : '#F5F3EF') : t3

  return (
    <div style={s.wrap}>
      <div style={s.panel}>

        {/* 상단 바 */}
        <div style={s.topBar}>
          <span style={s.appTitle}>✉️발췌 카드 만들기</span>
          <button style={s.darkBtn} onClick={() => setIsDark(d => !d)}>
            <span>{isDark ? '☀️' : '🌙'}</span>
            <span>{isDark ? '라이트 모드' : '다크 모드'}</span>
          </button>
        </div>

        {/* 미리보기 — previewWrap이 좌우 18px 여백 담당 */}
        <div style={s.previewWrap}>
          <div ref={previewRef} style={s.previewBox}>
            {/* 배경 레이어 */}
            <div style={{
              position: 'absolute', inset: 0,
              background: previewBg,
              filter: bgBlur ? 'blur(2px)' : 'none',
              transform: bgBlur ? 'scale(1.08)' : 'scale(1)',
              transition: 'filter .3s, transform .3s',
              zIndex: 0,
            }} />
            {/* 텍스트 레이어 */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={s.pvBody}>{body}</p>
              <p style={s.pvTitle}>{title}</p>
              <p style={s.pvAuthor}>{author}</p>
            </div>
          </div>
        </div>

        {/* 복사/저장 */}
        <div style={s.saveRow}>
          <button id="copy-btn" style={s.btnCopy} onClick={copyImage}>복사하기</button>
          <button style={s.btnSave} onClick={saveImage}>저장하기</button>
        </div>

        {/* 스크롤 영역 */}
        <div style={s.scrollArea}>

          {/* 발췌 옵션 토글 */}
          <div onClick={() => setOptOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none', padding: '3px 0 10px', width: '100%' }}>
           <span style={s.lv1}>발췌 옵션</span>
           <span>
              <span style={{ fontSize: 11, color: t3 }}>{optOpen ? '|     닫기' : '|     열기'}</span>
             <span style={{ fontSize: 9, color: t3, marginLeft: 3 }}>{optOpen ? '▴' : '▾'}</span>
           </span>
          </div>

          {optOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 4 }}>

              {/* 크기 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={s.lv2}>크기</span>
                <div style={{ display: 'flex', gap: 5 }}>
                  {[['r11','1:1'],['r34','3:4'],['r916','9:16']].map(([id, label]) => (
                    <button key={id} style={s.segBtn(ratio === id)} onClick={() => setRatio(id)}>{label}</button>
                  ))}
                </div>
              </div>

              {/* 배경 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={s.lv2}>배경</span>
                <div style={{ ...s.hScroll, paddingTop: 4, paddingBottom: 6 }} {...dragProps('bg')}>
                  <div onClick={() => document.getElementById('bg-file').click()}
                    style={{ width: 30, height: 34, borderRadius: 8, flexShrink: 0, cursor: 'pointer', background: isDark ? '#1e1e1e' : '#FAFAF8', border: `0.5px solid ${bdr}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 2v9M2 6.5h9" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    <input id="bg-file" type="file" accept="image/*, image/gif" style={{ display: 'none' }} onChange={handleBgImage} />
                  </div>
                  {COLORS.map(c => (
                    <div key={c.id}
                      onClick={() => { setBgColor(c.hex); setBgImage(null); setSelColor(c.id) }}
                      style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0, cursor: 'pointer',
                        background: c.hex, position: 'relative',
                        border: c.id === 'black'
                          ? (isDark ? '0.5px solid #666' : '0.5px solid #555')
                          : c.id === 'white' ? '0.5px solid #e0e0e0' : '0.5px solid rgba(0,0,0,0.08)',
                        outline: selColor === c.id ? `1.5px solid ${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'}` : 'none',
                        outlineOffset: 2,
                      }} />
                  ))}
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, cursor: 'pointer', fontSize: 12, color: sub, fontFamily: sans, paddingLeft: 5 }}>
                  <input type="checkbox" checked={bgBlur} onChange={e => setBgBlur(e.target.checked)}
                    style={{ width: 14, height: 14, cursor: 'pointer', accentColor: t1 }} />
                  배경 흐리게 하기
                </label>
              </div>

              {/* 글꼴 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={s.lv2}>글꼴</span>
                <div style={s.hScroll} {...dragProps('font')}>
                  {MAIN_FONTS.map(f => (
                    <button key={f.id}
                      style={{ ...s.fontBtn(activeFont === f.id), fontFamily: f.css }}
                      onClick={() => { setActiveFont(f.id); setFontCss(f.css) }}>
                      {f.label}
                    </button>
                  ))}
                  <button style={s.fontMoreBtn} onClick={() => setMoreOpen(o => !o)}>
                    {moreOpen ? '▴' : '▾'}
                  </button>
                </div>
                {moreOpen && (
                  <div style={{ ...s.hScroll, marginTop: 5, alignItems: 'center' }} {...dragProps('more')}>
                    {MORE_FONTS.map(g => (
                      <React.Fragment key={g.group}>
                        <span style={{ fontSize: 9, color: t3, whiteSpace: 'nowrap', flexShrink: 0, alignSelf: 'center', padding: '0 2px' }}>
                          {g.group}
                        </span>
                        {g.fonts.map(f => (
                         <button key={f.id}
                            style={{ ...s.fontBtn(activeFont === f.id), fontFamily: f.css }}
                            onClick={() => { setActiveFont(f.id); setFontCss(f.css) }}>
                           {f.label}
                          </button>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* 글자 크기 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={s.lv2}>글자 크기</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => setFontSize(v => Math.max(1, v - 1))}
                    style={{ width: 24, height: 24, borderRadius: '50%', border: `0.5px solid ${bdr}`, background: card, color: fontSize <= 1 ? t3 : t1, fontSize: 15, cursor: fontSize <= 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: sans }}>−</button>
                  <span style={{ fontSize: 12, fontWeight: 500, color: t1, minWidth: 14, textAlign: 'center', fontFamily: sans }}>{fontSize}</span>
                  <button onClick={() => setFontSize(v => Math.min(5, v + 1))}
                    style={{ width: 24, height: 24, borderRadius: '50%', border: `0.5px solid ${bdr}`, background: card, color: fontSize >= 5 ? t3 : t1, fontSize: 15, cursor: fontSize >= 5 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: sans }}>+</button>
                </div>
              </div>

              {/* 글자색 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={s.lv2}>글자색</span>
                <div style={{ display: 'flex', gap: 7 }}>
                  <button onClick={() => setTc('dark')}
                    style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: '#ffffff', border: tc === 'dark' ? '1.5px solid rgba(0,0,0,0.38)' : '1.5px solid #ddd', color: '#111', fontFamily: sans }}>A</button>
                  <button onClick={() => setTc('light')}
                    style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: '#111111', border: tc === 'light' ? '1.5px solid rgba(255,255,255,0.38)' : '1.5px solid #444', color: '#fff', fontFamily: sans }}>A</button>
                </div>
              </div>

              {/* 정렬 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 4 }}>
                <span style={s.lv2}>정렬</span>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['left', 'center', 'right'].map(a => {
                    const active = align === a
                    const lc = lineColor(active)
                    return (
                      <button key={a} onClick={() => setAlign(a)}
                        style={{ border: `0.5px solid ${active ? t1 : bdr}`, borderRadius: 7, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: active ? t1 : card, flexDirection: 'column', gap: 3, padding: '6px 5px' }}>
                        {ALIGN_LINES[a].map((l, i) => (
                          <span key={i} style={{ height: 1.5, borderRadius: 1, background: lc, display: 'block', ...l }} />
                        ))}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          )}

          <div style={s.divider} />

          {/* 본문 */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={s.lv1}>본문</span>
              <button onClick={() => { setBody(''); setTimeout(autoResize, 0) }}
                style={{ fontSize: 10, color: t3, background: 'none', border: 'none', cursor: 'pointer', fontFamily: sans }}>✕ 지우기</button>
            </div>
            <textarea ref={textareaRef}
              style={{ ...s.inputField, minHeight: 58, lineHeight: 1.6, overflow: 'hidden' }}
              value={body}
              onChange={e => setBody(e.target.value)} />
          </div>

          {/* 제목 */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ marginBottom: 4 }}><span style={s.lv1}>제목</span></div>
            <input style={s.inputField} value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          {/* 저자 */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ marginBottom: 4 }}><span style={s.lv1}>저자</span></div>
            <input style={s.inputField} value={author} onChange={e => setAuthor(e.target.value)} />
          </div>

          <div style={s.copyright}>ⓒ 2026. Sasa. All rights reserved.</div>

        </div>
      </div>

      {/* 모달 */}
      {modalImg && (
        <div onClick={() => setModalImg(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <p style={{ color: '#fff', fontSize: 13, marginBottom: 16, fontFamily: sans }}>이미지를 길게 눌러 저장하세요</p>
          <img
            src={modalImg}
            alt="발췌 카드"
            style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: 0, WebkitTouchCallout: 'default' }}
            onClick={e => e.stopPropagation()}
          />
          <button onClick={() => setModalImg(null)}
            style={{ marginTop: 20, padding: '8px 24px', borderRadius: 20, border: '0.5px solid rgba(255,255,255,0.4)', background: 'none', color: '#fff', fontSize: 12, cursor: 'pointer', fontFamily: sans }}>
            닫기
          </button>
        </div>
      )}
    </div>
  )
}