import React from 'react';
import {BrandMark} from './visuals.jsx';

export default function Landing({onAuth}){
 const openSignIn=()=>onAuth(false),openSignup=()=>onAuth(true);
 return <div className="landing">
  <header className="landing-nav">
   <a className="landing-brand" href="#top" aria-label="Fair Share home"><BrandMark/><span>Fair Share</span></a>
   <nav aria-label="Landing page navigation"><a href="#benefits">Benefits</a><a href="#how">How it works</a><a href="#plus">Plus</a></nav>
   <div className="landing-actions"><button className="landing-link" onClick={openSignIn}>Sign in</button><button className="landing-button compact" onClick={openSignup}>Get started</button></div>
  </header>
  <main id="top">
   <section className="landing-hero">
    <div className="hero-copy">
     <p className="landing-eyebrow">Shared expenses, made clear</p>
     <h1>Split costs.<br/>Keep the friendship.</h1>
     <p className="hero-lede">One calm place for group expenses, balances, reminders, and settlements. Everyone knows what happened and what comes next.</p>
     <div className="hero-actions"><button className="landing-button" onClick={openSignup}>Create your workspace</button><button className="landing-link arrow" onClick={openSignIn}>Sign in to Fair Share</button></div>
     <p className="hero-note">Core expense sharing is free. Sign in to begin.</p>
    </div>
    <div className="product-frame" aria-label="Fair Share workflow preview">
     <div className="preview-top"><span className="preview-logo"><BrandMark/>Fair Share</span><span>Workspace</span></div>
     <div className="preview-body">
      <div className="preview-rail"><i className="active"/><i/><i/><i/></div>
      <div className="preview-content">
       <p>YOUR WORKSPACE</p><h2>Everything settles into place.</h2>
       <div className="preview-balance"><span>Live balance</span><strong>Always current</strong><small>Every expense and payment updates the group.</small></div>
       <div className="preview-grid"><div><span>01</span><strong>Create a group</strong></div><div><span>02</span><strong>Add an expense</strong></div><div><span>03</span><strong>Settle once</strong></div></div>
      </div>
     </div>
    </div>
   </section>
   <section className="landing-section benefits" id="benefits">
    <div className="section-intro"><p className="landing-eyebrow">Built for real groups</p><h2>Less bookkeeping.<br/>Fewer awkward messages.</h2></div>
    <div className="benefit-grid">
     <article><span>01</span><h3>Flexible splits</h3><p>Divide expenses equally, by exact amounts, percentages, or shares.</p></article>
     <article><span>02</span><h3>Balances that explain themselves</h3><p>See who paid, who owes, and how every settlement changed the total.</p></article>
     <article><span>03</span><h3>One shared record</h3><p>Keep groups, expenses, notes, comments, and payments in the same workspace.</p></article>
    </div>
   </section>
   <section className="landing-section workflow" id="how">
    <div className="workflow-copy"><p className="landing-eyebrow">A shorter path to settled</p><h2>Start in minutes.</h2><p>Create a group, add the people involved, and record the first expense. Fair Share handles the running balance from there.</p><button className="landing-button light" onClick={openSignup}>Start splitting</button></div>
    <ol className="workflow-list"><li><span>01</span><div><h3>Bring the group together</h3><p>Trips, homes, partners, and everyday plans each get a clean space.</p></div></li><li><span>02</span><div><h3>Record expenses your way</h3><p>Choose the payer and split method without doing the maths yourself.</p></div></li><li><span>03</span><div><h3>Settle with confidence</h3><p>Record payments and keep a clear history for everyone involved.</p></div></li></ol>
   </section>
   <section className="landing-section trust">
    <p className="landing-eyebrow">Designed for clarity</p><div className="trust-row"><h2>Your expenses belong to your account.</h2><p>Authentication is handled by Supabase. Your shared workspace is stored securely and is available only after sign in.</p></div>
   </section>
   <section className="landing-section plus" id="plus">
    <div><p className="landing-eyebrow">Fair Share Plus</p><h2>More context when you want it.</h2><p>Core splitting stays free. Plus adds spending summaries, category breakdowns, and CSV exports.</p></div>
    <div className="plus-offer"><strong>₹149</strong><span>30 days</span><small>One payment. No automatic renewal.</small><button className="landing-button" onClick={openSignup}>Create an account</button></div>
   </section>
   <section className="landing-cta"><BrandMark/><h2>Make the next shared expense easy.</h2><p>Sign in, create a group, and let Fair Share keep the balance.</p><button className="landing-button" onClick={openSignup}>Get started</button></section>
  </main>
  <footer className="landing-footer"><span><BrandMark/>Fair Share</span><span>Shared expenses, without the friction.</span><button onClick={openSignIn}>Sign in</button></footer>
 </div>
}
