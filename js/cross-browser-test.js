// Cross-browser testing utilities and fixes
(function() {
    'use strict';
    
    // Browser detection utility
    const BrowserDetector = {
        isChrome: () => /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isFirefox: () => /Firefox/.test(navigator.userAgent),
        isSafari: () => /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        isEdge: () => /Edg/.test(navigator.userAgent),
        isIE: () => /MSIE|Trident/.test(navigator.userAgent),
        isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };
    
    // Feature detection and polyfills
    const FeatureSupport = {
        // Check for CSS Grid support
        supportsGrid: () => {
            return CSS.supports('display', 'grid');
        },
        
        // Check for CSS Custom Properties support
        supportsCustomProperties: () => {
            return CSS.supports('color', 'var(--test)');
        },
        
        // Check for Flexbox support
        supportsFlexbox: () => {
            return CSS.supports('display', 'flex');
        },
        
        // Check for CSS animations support
        supportsAnimations: () => {
            return CSS.supports('animation', 'test 1s');
        },
        
        // Check for Web Storage support
        supportsLocalStorage: () => {
            try {
                const test = 'test';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch(e) {
                return false;
            }
        },
        
        // Check for crypto.getRandomValues support
        supportsCrypto: () => {
            return window.crypto && typeof window.crypto.getRandomValues === 'function';
        }
    };
    
    // Cross-browser fixes
    const CrossBrowserFixes = {
        // Fix for older browsers that don't support CSS custom properties
        fixCustomProperties: function() {
            if (!FeatureSupport.supportsCustomProperties()) {
                console.warn('CSS Custom Properties not supported, applying fallbacks');
                
                // Apply fallback colors directly
                const style = document.createElement('style');
                style.textContent = `
                    body { background-color: #0a0a0a; color: #e0e0e0; }
                    h1, h2, h3 { color: #c7a758; }
                    .poe-button { background-color: #8a0303; border-color: #c7a758; }
                    .generator-section { background-color: #252525; }
                    a { color: #c7a758; }
                `;
                document.head.appendChild(style);
            }
        },
        
        // Fix for browsers without Grid support
        fixGridLayout: function() {
            if (!FeatureSupport.supportsGrid()) {
                console.warn('CSS Grid not supported, applying flexbox fallback');
                
                const style = document.createElement('style');
                style.textContent = `
                    .footer-content {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                    .footer-section {
                        flex: 1;
                        min-width: 200px;
                        margin-bottom: 20px;
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        // Fix for Safari-specific issues
        fixSafariIssues: function() {
            if (BrowserDetector.isSafari()) {
                console.log('Applying Safari-specific fixes');
                
                const style = document.createElement('style');
                style.textContent = `
                    /* Fix for Safari button appearance */
                    .poe-button {
                        -webkit-appearance: none;
                        -webkit-border-radius: 3px;
                    }
                    
                    /* Fix for Safari flexbox issues */
                    .generator-section {
                        -webkit-flex-direction: column;
                    }
                    
                    /* Fix for Safari transform issues */
                    .skill-display {
                        -webkit-transform: translateZ(0);
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        // Fix for Firefox-specific issues
        fixFirefoxIssues: function() {
            if (BrowserDetector.isFirefox()) {
                console.log('Applying Firefox-specific fixes');
                
                const style = document.createElement('style');
                style.textContent = `
                    /* Fix for Firefox button styling */
                    .poe-button::-moz-focus-inner {
                        border: 0;
                        padding: 0;
                    }
                    
                    /* Fix for Firefox animation performance */
                    .skill-animation {
                        will-change: auto;
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        // Fix for Edge-specific issues
        fixEdgeIssues: function() {
            if (BrowserDetector.isEdge()) {
                console.log('Applying Edge-specific fixes');
                
                const style = document.createElement('style');
                style.textContent = `
                    /* Fix for Edge CSS Grid issues */
                    .footer-content {
                        -ms-grid-columns: 1fr 1fr 1fr;
                    }
                    
                    /* Fix for Edge flexbox issues */
                    .generator-section {
                        -ms-flex-direction: column;
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        // Fix for Internet Explorer (if still needed)
        fixIEIssues: function() {
            if (BrowserDetector.isIE()) {
                console.warn('Internet Explorer detected - limited support');
                
                // Show warning message
                const warning = document.createElement('div');
                warning.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #ff6666;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    z-index: 9999;
                `;
                warning.textContent = 'This website has limited support for Internet Explorer. Please use a modern browser for the best experience.';
                document.body.insertBefore(warning, document.body.firstChild);
            }
        },
        
        // Fix for mobile-specific issues
        fixMobileIssues: function() {
            if (BrowserDetector.isMobile()) {
                console.log('Applying mobile-specific fixes');
                
                const style = document.createElement('style');
                style.textContent = `
                    /* Fix for mobile touch targets */
                    .poe-button {
                        min-height: 48px;
                        min-width: 48px;
                    }
                    
                    /* Fix for mobile viewport issues */
                    body {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
                    
                    /* Fix for mobile scrolling */
                    body {
                        -webkit-overflow-scrolling: touch;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };
    
    // Performance monitoring
    const PerformanceMonitor = {
        startTime: null,
        
        start: function() {
            this.startTime = performance.now();
        },
        
        end: function(label) {
            if (this.startTime) {
                const duration = performance.now() - this.startTime;
                console.log(`${label}: ${duration.toFixed(2)}ms`);
                this.startTime = null;
                return duration;
            }
        },
        
        measurePageLoad: function() {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('Page load time exceeds 3 seconds');
                }
            });
        }
    };
    
    // Accessibility testing utilities
    const AccessibilityTester = {
        checkColorContrast: function() {
            // Basic color contrast checking
            const elements = document.querySelectorAll('*');
            const issues = [];
            
            elements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const bgColor = styles.backgroundColor;
                const textColor = styles.color;
                
                // Skip elements with transparent backgrounds
                if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                    return;
                }
                
                // This is a simplified check - in production, you'd use a proper contrast ratio calculator
                if (textColor === bgColor) {
                    issues.push({
                        element: el,
                        issue: 'Text color same as background color'
                    });
                }
            });
            
            if (issues.length > 0) {
                console.warn('Color contrast issues found:', issues);
            } else {
                console.log('No obvious color contrast issues detected');
            }
        },
        
        checkKeyboardNavigation: function() {
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            console.log(`Found ${focusableElements.length} focusable elements`);
            
            // Check for missing focus indicators
            focusableElements.forEach(el => {
                const styles = window.getComputedStyle(el, ':focus');
                if (styles.outline === 'none' && !styles.boxShadow.includes('rgba')) {
                    console.warn('Element missing focus indicator:', el);
                }
            });
        },
        
        checkAriaLabels: function() {
            const interactiveElements = document.querySelectorAll('button, [role="button"], input, select, textarea');
            const issues = [];
            
            interactiveElements.forEach(el => {
                const hasLabel = el.getAttribute('aria-label') || 
                                el.getAttribute('aria-labelledby') || 
                                el.textContent.trim() ||
                                (el.tagName === 'INPUT' && el.getAttribute('placeholder'));
                
                if (!hasLabel) {
                    issues.push(el);
                }
            });
            
            if (issues.length > 0) {
                console.warn('Elements missing accessible labels:', issues);
            } else {
                console.log('All interactive elements have accessible labels');
            }
        }
    };
    
    // Test runner
    const TestRunner = {
        runAllTests: function() {
            console.group('Cross-Browser Testing Results');
            
            // Browser detection
            console.log('Browser Detection:', {
                Chrome: BrowserDetector.isChrome(),
                Firefox: BrowserDetector.isFirefox(),
                Safari: BrowserDetector.isSafari(),
                Edge: BrowserDetector.isEdge(),
                IE: BrowserDetector.isIE(),
                Mobile: BrowserDetector.isMobile()
            });
            
            // Feature support
            console.log('Feature Support:', {
                Grid: FeatureSupport.supportsGrid(),
                CustomProperties: FeatureSupport.supportsCustomProperties(),
                Flexbox: FeatureSupport.supportsFlexbox(),
                Animations: FeatureSupport.supportsAnimations(),
                LocalStorage: FeatureSupport.supportsLocalStorage(),
                Crypto: FeatureSupport.supportsCrypto()
            });
            
            // Apply fixes
            CrossBrowserFixes.fixCustomProperties();
            CrossBrowserFixes.fixGridLayout();
            CrossBrowserFixes.fixSafariIssues();
            CrossBrowserFixes.fixFirefoxIssues();
            CrossBrowserFixes.fixEdgeIssues();
            CrossBrowserFixes.fixIEIssues();
            CrossBrowserFixes.fixMobileIssues();
            
            // Performance monitoring
            PerformanceMonitor.measurePageLoad();
            
            // Accessibility tests
            setTimeout(() => {
                console.group('Accessibility Tests');
                AccessibilityTester.checkColorContrast();
                AccessibilityTester.checkKeyboardNavigation();
                AccessibilityTester.checkAriaLabels();
                console.groupEnd();
            }, 1000);
            
            console.groupEnd();
        }
    };
    
    // Auto-run tests when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', TestRunner.runAllTests);
    } else {
        TestRunner.runAllTests();
    }
    
    // Export for manual testing
    window.CrossBrowserTest = {
        BrowserDetector,
        FeatureSupport,
        CrossBrowserFixes,
        PerformanceMonitor,
        AccessibilityTester,
        TestRunner
    };
})();