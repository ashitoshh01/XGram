"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";

export default function ReportIssuePage() {
    const [issueType, setIssueType] = useState("technical");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error("Please provide both a title and a description.");
            return;
        }

        setIsSubmitting(true);

        // Simulating an API call to send the feedback/report
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success("Thank you! Your issue has been reported successfully. Our team will look into it shortly.", {
            duration: 5000
        });

        // Reset form
        setTitle("");
        setDescription("");
        setIssueType("technical");
        setIsSubmitting(false);
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: '2rem 1rem' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Report an Issue</h1>
                    <p>Found a bug or having trouble with an order? Let us know so we can fix it.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="issueType">Type of Issue</label>
                        <select
                            id="issueType"
                            className={styles.input}
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                        >
                            <option value="technical">Technical Bug / Glitch</option>
                            <option value="order">Order or Payment Issue</option>
                            <option value="supplier">Report a Supplier</option>
                            <option value="feedback">General Feedback</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Issue Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Briefly describe the issue..."
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Detailed Description</label>
                        <textarea
                            id="description"
                            placeholder="Please provide as much detail as possible to help us resolve the issue quickly..."
                            className={styles.textarea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className={`btn btn-primary ${styles.saveBtn}`} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting Report..." : "Submit Report"}
                    </button>
                </form>
            </div>
        </div>
    );
}
