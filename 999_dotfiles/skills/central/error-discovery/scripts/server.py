#!/usr/bin/env python3
"""Minimal review server for error-discovery. 0 external dependencies.
Serves the HTML app and persists annotations to error_discovery_data/annotations.json.
"""
import json
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

DATA_DIR = Path("error_discovery_data")
DATA_DIR.mkdir(exist_ok=True)
ANNOTATIONS_FILE = DATA_DIR / "annotations.json"

class ReviewHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/annotations":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            if ANNOTATIONS_FILE.exists():
                self.wfile.write(ANNOTATIONS_FILE.read_bytes())
            else:
                self.wfile.write(b"[]")
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == "/api/annotations":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            try:
                data = json.loads(body)
                ANNOTATIONS_FILE.write_text(json.dumps(data, indent=2), encoding="utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(b'{"status":"ok"}')
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(str(e).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    server = HTTPServer(("127.0.0.1", port), ReviewHandler)
    print(f"Review server running at http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
