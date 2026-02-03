import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="landing-page">
      <!-- Header -->
      <header class="header">
        <div class="container">
          <div class="nav">
            <div class="logo">CVizard</div>
            <div class="nav-links">
              <a [routerLink]="['/login']" class="btn btn-outline">Login</a>
              <a [routerLink]="['/register']" class="btn btn-primary">Get Started</a>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Transform Your Resume with AI</h1>
            <p class="hero-subtitle">Get instant ATS scoring, personalized recommendations, and optimize your resume for any job description using advanced AI technology.</p>
            <div class="hero-buttons">
              <a [routerLink]="['/register']" class="btn btn-primary btn-large">Start Free Analysis</a>
              <button class="btn btn-outline btn-large" (click)="scrollToFeatures()">Learn More</button>
            </div>
          </div>
          <div class="hero-image">
            <div class="resume-mockup">
              <div class="mockup-header">Resume</div>
              <div class="mockup-lines">Generate Your Own Latex Code with Improved ATS</div>
              <div class="ai-badge">AI Powered</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features" id="features">
        <div class="container">
          <h2 class="section-title">Why Choose CVizard?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🤖</div>
              <h3>AI-Powered Analysis</h3>
              <p>Advanced algorithms analyze your resume against job descriptions for maximum compatibility.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>ATS Score</h3>
              <p>Get instant ATS compatibility scores and know exactly how recruiters will see your resume.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💡</div>
              <h3>Smart Recommendations</h3>
              <p>Receive personalized suggestions to improve your resume and increase interview chances.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Instant Results</h3>
              <p>Upload your resume and get comprehensive analysis results in seconds, not hours.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-it-works">
        <div class="container">
          <h2 class="section-title">How It Works</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>Upload Resume</h3>
              <p>Upload your resume in PDF or DOCX format</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>Add Job Description</h3>
              <p>Paste the job description you're targeting</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>Get AI Analysis</h3>
              <p>Receive detailed analysis and recommendations</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <h2>Ready to Optimize Your Resume?</h2>
          <p>Join thousands of job seekers who have improved their chances with CVizard</p>
          <a [routerLink]="['/register']" class="btn btn-primary btn-large">Get Started Free</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .landing-page {
      min-height: 100vh;
      background: white;
    }

    .header {
      background: white;
      box-shadow: 0 2px 10px rgba(37, 99, 235, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2563eb;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .hero {
      padding: 8rem 0 4rem;
      background: #f8fafc;
    }

    .hero .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      color: #64748b;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
    }

    .hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .resume-mockup {
      width: 380px;
      height: 400px;
      background: linear-gradient(145deg, #ffffff, #f0f4f8);
      border-radius: 20px;
      box-shadow: 
        0 20px 40px rgba(37, 99, 235, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
      padding: 2rem;
      position: relative;
      animation: float 4s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
      overflow: hidden;
    }

    .resume-mockup::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(37, 99, 235, 0.1), transparent);
      animation: scan 3s linear infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-8px) rotate(1deg); }
      50% { transform: translateY(-15px) rotate(0deg); }
      75% { transform: translateY(-8px) rotate(-1deg); }
    }

    @keyframes glow {
      0% { box-shadow: 0 20px 40px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6); }
      100% { box-shadow: 0 25px 50px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8); }
    }

    @keyframes scan {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }

    .mockup-header {
      height: 60px;
      background: linear-gradient(135deg, #2563eb, #3b82f6, #1d4ed8);
      border-radius: 12px;
      margin-bottom: 1rem;
      position: relative;
      overflow: hidden;
      animation: headerPulse 2s ease-in-out infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .mockup-header::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shine 2s infinite;
    }

    @keyframes headerPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    @keyframes shine {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .mockup-lines {
      height: 200px;
      background: #f1f5f9;
      border-radius: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1rem;
      color: #64748b;
      font-weight: 500;
      font-size: 0.9rem;
      line-height: 1.4;
      animation: fadeLines 2s ease-in-out infinite alternate;
    }

    @keyframes typewriter {
      0% { background-position: -200px 0, 0 0; }
      100% { background-position: 200px 0, 0 0; }
    }

    @keyframes fadeLines {
      0% { opacity: 0.6; }
      100% { opacity: 1; }
    }

    .ai-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 25px;
      font-size: 0.8rem;
      font-weight: 700;
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
      animation: 
        bounce 2s infinite,
        rotate 4s linear infinite,
        badgeGlow 2s ease-in-out infinite alternate;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 10;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
      40% { transform: translateY(-12px) rotate(var(--rotation, 0deg)); }
      60% { transform: translateY(-6px) rotate(var(--rotation, 0deg)); }
    }

    @keyframes rotate {
      0% { --rotation: 0deg; }
      25% { --rotation: 5deg; }
      50% { --rotation: 0deg; }
      75% { --rotation: -5deg; }
      100% { --rotation: 0deg; }
    }

    @keyframes badgeGlow {
      0% { box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4); }
      100% { box-shadow: 0 12px 30px rgba(37, 99, 235, 0.6); }
    }

    .features {
      padding: 4rem 0;
      background: white;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 3rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      text-align: center;
      padding: 2rem;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
      transition: all 0.3s;
    }

    .feature-card:hover {
      border-color: #2563eb;
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #64748b;
      line-height: 1.6;
    }

    .how-it-works {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .step {
      text-align: center;
      padding: 2rem;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto 1rem;
    }

    .step h3 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .step p {
      color: #64748b;
    }

    .cta {
      padding: 4rem 0;
      background: #2563eb;
      color: white;
      text-align: center;
    }

    .cta h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .cta p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }



    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover {
      background: #1d4ed8;
    }

    .btn-outline {
      background: transparent;
      color: #2563eb;
      border-color: #2563eb;
    }

    .btn-outline:hover {
      background: #2563eb;
      color: white;
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .hero .container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2rem;
      }
      
      .nav-links {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class LandingComponent {
  scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }
}