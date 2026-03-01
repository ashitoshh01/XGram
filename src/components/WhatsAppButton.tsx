"use client";

import React from "react";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/919604019444"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "60px",
                height: "60px",
                backgroundColor: "#25D366",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                zIndex: 9999,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                textDecoration: "none",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
            aria-label="Chat with us on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="currentColor"
            >
                <path d="M12.031 2.015A10.027 10.027 0 002.01 12.035c0 1.636.417 3.228 1.206 4.653L2 22l5.474-1.218a9.99 9.99 0 004.557 1.09h.004a10.033 10.033 0 0010.036-10.04 10.015 10.015 0 00-2.936-7.098 10.013 10.013 0 00-7.104-2.719zM12.03 20.178h-.002a8.318 8.318 0 01-4.238-1.155l-.304-.18-3.148.701.841-3.072-.198-.315A8.307 8.307 0 013.68 12.035a8.35 8.35 0 018.35-8.35 8.337 8.337 0 015.918 2.26 8.335 8.335 0 012.443 5.922 8.353 8.353 0 01-8.361 8.311zm4.582-6.262c-.25-.125-1.487-.734-1.718-.818-.23-.083-.398-.125-.566.125-.167.25-.65.817-.797.983-.147.167-.294.188-.544.063-.25-.125-1.062-.39-2.022-1.246-.747-.666-1.252-1.49-1.399-1.74-.148-.25-.016-.385.11-.51.112-.11.25-.292.375-.438.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.063-.125-.566-1.365-.776-1.87-.205-.49-.413-.424-.566-.432h-.483c-.167 0-.437.063-.666.292-.229.23-.874.854-.874 2.083s.895 2.417 1.02 2.583c.125.167 1.762 2.688 4.27 3.771.597.257 1.063.411 1.427.525.6.19 1.147.163 1.577.098.483-.072 1.487-.607 1.696-1.196.21-.587.21-1.092.148-1.196-.063-.104-.23-.166-.482-.292z" />
            </svg>
        </a>
    );
}
