// Performance testing utilities
class PerformanceTest {
    constructor() {
        this.results = [];
        this.isRunning = false;
    }
    
    // Test loading time
    async testLoadingTime() {
        const startTime = performance.now();
        
        // Wait for DOM to be fully loaded
        await new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
        
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        this.results.push({
            test: 'Page Load Time',
            time: loadTime,
            status: loadTime < 3000 ? 'PASS' : 'FAIL',
            threshold: '< 3000ms'
        });
        
        return loadTime;
    }
    
    // Test skill generation performance
    testSkillGeneration(iterations = 100) {
        if (!window.skillsData || !window.SkillDataService) {
            console.error('Required dependencies not loaded');
            return;
        }
        
        const dataService = new SkillDataService(skillsData);
        const times = [];
        
        for (let i = 0; i < iterations; i++) {
            const startTime = performance.now();
            dataService.getRandomSkill();
            const endTime = performance.now();
            times.push(endTime - startTime);
        }
        
        const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
        const maxTime = Math.max(...times);
        const minTime = Math.min(...times);
        
        this.results.push({
            test: 'Skill Generation Performance',
            avgTime: avgTime,
            maxTime: maxTime,
            minTime: minTime,
            iterations: iterations,
            status: avgTime < 1 ? 'PASS' : 'FAIL',
            threshold: '< 1ms average'
        });
        
        return { avgTime, maxTime, minTime };
    }
    
    // Test animation performance
    testAnimationPerformance() {
        return new Promise((resolve) => {
            const testElement = document.createElement('div');
            testElement.style.cssText = `
                position: fixed;
                top: -100px;
                left: -100px;
                width: 50px;
                height: 50px;
                background: red;
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
            
            document.body.appendChild(testElement);
            
            const startTime = performance.now();
            let frameCount = 0;
            
            // Trigger animation
            requestAnimationFrame(() => {
                testElement.style.opacity = '1';
                testElement.style.transform = 'translateY(0) scale(1)';
            });
            
            // Monitor frame rate during animation
            function countFrames() {
                frameCount++;
                if (performance.now() - startTime < 600) {
                    requestAnimationFrame(countFrames);
                } else {
                    const fps = frameCount / 0.6; // 600ms = 0.6s
                    document.body.removeChild(testElement);
                    
                    this.results.push({
                        test: 'Animation Performance',
                        fps: fps,
                        status: fps > 30 ? 'PASS' : 'FAIL',
                        threshold: '> 30 FPS'
                    });
                    
                    resolve(fps);
                }
            }
            
            requestAnimationFrame(countFrames.bind(this));
        });
    }
    
    // Test memory usage
    testMemoryUsage() {
        if (!performance.memory) {
            this.results.push({
                test: 'Memory Usage',
                status: 'SKIP',
                reason: 'Performance.memory not available'
            });
            return null;
        }
        
        const memory = performance.memory;
        const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
        const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
        
        this.results.push({
            test: 'Memory Usage',
            used: `${usedMB} MB`,
            total: `${totalMB} MB`,
            limit: `${limitMB} MB`,
            status: usedMB < 50 ? 'PASS' : 'WARN',
            threshold: '< 50 MB'
        });
        
        return { usedMB, totalMB, limitMB };
    }
    
    // Run all performance tests
    async runAllTests() {
        if (this.isRunning) {
            console.warn('Performance tests already running');
            return;
        }
        
        this.isRunning = true;
        this.results = [];
        
        console.log('Running performance tests...');
        
        try {
            await this.testLoadingTime();
            this.testSkillGeneration();
            await this.testAnimationPerformance();
            this.testMemoryUsage();
            
            this.displayResults();
        } catch (error) {
            console.error('Performance test failed:', error);
        } finally {
            this.isRunning = false;
        }
    }
    
    // Display test results
    displayResults() {
        console.log('\n=== Performance Test Results ===');
        
        this.results.forEach(result => {
            const status = result.status === 'PASS' ? '✅' : 
                          result.status === 'FAIL' ? '❌' : 
                          result.status === 'WARN' ? '⚠️' : '⏭️';
            
            console.log(`${status} ${result.test}`);
            
            if (result.time) {
                console.log(`   Time: ${result.time.toFixed(2)}ms (${result.threshold})`);
            }
            if (result.avgTime) {
                console.log(`   Avg: ${result.avgTime.toFixed(3)}ms, Max: ${result.maxTime.toFixed(3)}ms, Min: ${result.minTime.toFixed(3)}ms`);
            }
            if (result.fps) {
                console.log(`   FPS: ${result.fps.toFixed(1)} (${result.threshold})`);
            }
            if (result.used) {
                console.log(`   Used: ${result.used}, Total: ${result.total}, Limit: ${result.limit}`);
            }
            if (result.reason) {
                console.log(`   Reason: ${result.reason}`);
            }
        });
        
        const passCount = this.results.filter(r => r.status === 'PASS').length;
        const totalCount = this.results.length;
        
        console.log(`\nOverall: ${passCount}/${totalCount} tests passed`);
    }
    
    // Get results as JSON
    getResults() {
        return this.results;
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.PerformanceTest = PerformanceTest;
}

// Auto-run tests in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    document.addEventListener('DOMContentLoaded', () => {
        // Run tests after a short delay to ensure everything is loaded
        setTimeout(() => {
            const perfTest = new PerformanceTest();
            perfTest.runAllTests();
        }, 1000);
    });
}