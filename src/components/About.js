import React from 'react'
import aboutImg from './about.jpg';

export default function About() {

  return (
    <div>
      <section className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="heading-center">About Us</h2>
            <p>
              iNotebook is a secure and modern note-taking web application
              built with the MERN stack. It allows you to store, update, and
              delete your personal notes from anywhere.
            </p>
            <p>
              This app uses a secure API and JWT authentication to protect your
              data. All notes are stored in MongoDB and can be accessed only by
              the logged-in user.
            </p>
          </div>
          <div className="col-md-6">
            <img src={aboutImg} className="img-fluid rounded" alt="" />
          </div>
        </div>
      </section>

    </div>
  )
}