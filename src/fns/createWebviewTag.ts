import WebviewTag = Electron.WebviewTag

export const createWebviewTag = (params: Partial<GateFrameOption>): WebviewTag => {
    const webviewTag = document.createElement('webview') as unknown as WebviewTag
    webviewTag.setAttribute('allowpopups', 'true')
    webviewTag.setAttribute('partition', 'persist:' + params.profileKey)
    webviewTag.setAttribute('src', params.url ?? 'about:blank')
    webviewTag.addClass('open-gate-webview')

    if (params.userAgent && params.userAgent !== '') {
        webviewTag.setAttribute('useragent', params.userAgent)
    }

    webviewTag.addEventListener('dom-ready', async () => {
        if (params.css) {
            await webviewTag.insertCSS(params.css)
        }

        if (params.zoomFactor) {
            webviewTag.setZoomFactor(params.zoomFactor)
        }
    })

    return webviewTag
}
