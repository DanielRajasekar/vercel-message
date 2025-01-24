import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            Name: name,
            Title: title,
            Message: message,
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL || "http://localhost:8888"}/api/messages`,
                post,
                { withCredentials: true }
            );
            console.log(response.data);
            setSuccess("Message sent successfully.");
            setName("");
            setTitle("");
            setMessage("");
            setError(null);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message || "An error occurred while sending the message."
            );
            setSuccess(null);
        }
    };

    // Reset error or success message on input change
    const resetFeedback = () => {
        setError(null);
        setSuccess(null);
    };

    return (
        <>
            <div className="container mt-5">
                <h2>Post Message Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            onChange={(e) => {
                                setName(e.target.value);
                                resetFeedback();
                            }}
                            className="form-control"
                            value={name}
                            placeholder="Enter your Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            type="text"
                            onChange={(e) => {
                                setTitle(e.target.value);
                                resetFeedback();
                            }}
                            className="form-control"
                            value={title}
                            placeholder="Enter the subject Title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            onChange={(e) => {
                                setMessage(e.target.value);
                                resetFeedback();
                            }}
                            className="form-control"
                            value={message}
                            placeholder="Enter the Message description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
            </div>
        </>
    );
};

export default Home;
