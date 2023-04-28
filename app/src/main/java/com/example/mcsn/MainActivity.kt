package com.example.mcsn

import android.os.Bundle
import androidx.activity.ComponentActivity
import android.webkit.WebView

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Find the WebView by its ID in the XML layout
        webView = findViewById(R.id.webview)

        // Configure the WebView settings
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true

        // Load the local HTML file in the WebView
        webView.loadUrl("file:///android_asset/index.html")

        // Set the WebView to take up the entire screen
        val webSettings = webView.settings
        webSettings.setSupportZoom(false)
        webSettings.javaScriptEnabled = true
        webSettings.loadWithOverviewMode = true
        webSettings.useWideViewPort = true

    }
}
