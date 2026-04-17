"use client"

import { useState, useRef, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Copy, Check } from "lucide-react"

export function QRGenerator() {
  const [text, setText] = useState("https://vercel.com")
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector("canvas")
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = url
      link.click()
    }
  }

  const copyQR = async () => {
    const canvas = canvasRef.current?.querySelector("canvas")
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            QR Code Generator
          </h1>
          <p className="text-muted-foreground">
            Enter text or a URL to generate a QR code
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 space-y-6">
            <Input
              type="text"
              placeholder="Enter text or URL..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />

            <div
              ref={canvasRef}
              className="relative flex flex-col items-center justify-center p-8 bg-black rounded-lg"
            >
              <img
                src="/images/pokeball-icon.jpg"
                alt=""
                className="absolute top-2 left-2 w-16 h-16 object-cover rounded-full opacity-70"
                crossOrigin="anonymous"
              />
              <img
                src="/images/pikachu-icon.jpg"
                alt=""
                className="absolute top-2 right-2 w-16 h-16 object-cover rounded-full opacity-70"
                crossOrigin="anonymous"
              />
              <img
                src="/images/pokeball-icon.jpg"
                alt=""
                className="absolute bottom-2 left-2 w-16 h-16 object-cover rounded-full opacity-70"
                crossOrigin="anonymous"
              />
              <img
                src="/images/pikachu-icon.jpg"
                alt=""
                className="absolute bottom-2 right-2 w-16 h-16 object-cover rounded-full opacity-70"
                crossOrigin="anonymous"
              />
              <p className="text-lg font-semibold text-white tracking-wide mb-5">
                Rejoignez nous
              </p>
              <QRCodeCanvas
                value={text || " "}
                size={200}
                level="H"
                includeMargin={false}
                bgColor="transparent"
                fgColor="#ffffff"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={downloadQR}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!text}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
              <Button
                onClick={copyQR}
                variant="secondary"
                className="flex-1"
                disabled={!text}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Scan with your phone camera to test
        </p>
      </div>
    </div>
  )
}
