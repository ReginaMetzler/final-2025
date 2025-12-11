// ============================================
// PROBLEM 1: Is the given point on the line?
// ============================================

class Problem1 {
    constructor() {
        this.point = null;
        this.slope = null;
        this.intercept = null;
        this.isOnLine = false;
        this.answered = false;
        
        this.init();
    }

    generateProblem() {
        // Generate random slope and intercept
        this.slope = Math.floor(Math.random() * 5) - 2; // -2 to 2
        this.intercept = Math.floor(Math.random() * 6) - 3; // -3 to 3
        
        // Generate random point
        const x = Math.floor(Math.random() * 11) - 5; // -5 to 5
        const y = this.slope * x + this.intercept;
        
        // Add some points that are NOT on the line
        if (Math.random() > 0.5) {
            this.point = [x, y + (Math.random() > 0.5 ? 1 : -1)];
            this.isOnLine = false;
        } else {
            this.point = [x, y];
            this.isOnLine = true;
        }
        
        this.answered = false;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('p1-point').textContent = `(${this.point[0]}, ${this.point[1]})`;
        document.getElementById('p1-equation').textContent = this.getLineEquation();
        document.getElementById('p1-feedback').textContent = '';
        document.getElementById('p1-feedback').className = 'feedback empty';
        
        this.drawGraph();
    }

    getLineEquation() {
        let eq = `y = ${this.slope}x`;
        if (this.intercept >= 0) {
            eq += ` + ${this.intercept}`;
        } else {
            eq += ` - ${Math.abs(this.intercept)}`;
        }
        return eq;
    }

    drawGraph() {
        const canvas = document.getElementById('p1-canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 30; // pixels per unit

        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = -5; i <= 5; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(centerX + i * scale, 0);
            ctx.lineTo(centerX + i * scale, height);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, centerY - i * scale);
            ctx.lineTo(width, centerY - i * scale);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        // Draw numbers on axes
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        for (let i = -5; i <= 5; i++) {
            if (i !== 0) {
                ctx.fillText(i, centerX + i * scale, centerY + 5);
            }
        }

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = -5; i <= 5; i++) {
            if (i !== 0) {
                ctx.fillText(i, centerX - 5, centerY - i * scale);
            }
        }

        // Draw origin
        ctx.fillText('0', centerX - 5, centerY + 12);

        // Draw line
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();

        let firstPoint = true;
        for (let x = -5; x <= 5; x += 0.1) {
            const y = this.slope * x + this.intercept;
            const canvasX = centerX + x * scale;
            const canvasY = centerY - y * scale;

            if (firstPoint) {
                ctx.moveTo(canvasX, canvasY);
                firstPoint = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
    }

    checkAnswer(isCorrect) {
        this.answered = true;
        const feedback = document.getElementById('p1-feedback');

        if (isCorrect === this.isOnLine) {
            feedback.textContent = '✓ Correct!';
            feedback.className = 'feedback correct';
        } else {
            if (this.isOnLine) {
                feedback.textContent = '✗ Incorrect! The point IS on the line. Substitute the x-coordinate into the equation to verify.';
            } else {
                feedback.textContent = '✗ Incorrect! The point IS NOT on the line. When you substitute the x-coordinate, the y-value doesn\'t match.';
            }
            feedback.className = 'feedback incorrect';
        }
    }

    init() {
        this.generateProblem();

        document.getElementById('p1-true').addEventListener('click', () => this.checkAnswer(true));
        document.getElementById('p1-false').addEventListener('click', () => this.checkAnswer(false));
        document.getElementById('p1-next').addEventListener('click', () => this.generateProblem());
    }
}

// ============================================
// PROBLEM 2: Find the Slope
// ============================================

class Problem2 {
    constructor() {
        this.point1 = null;
        this.point2 = null;
        this.correctSlope = null;
        this.answered = false;
        
        this.init();
    }

    generateProblem() {
        const x1 = Math.floor(Math.random() * 9) - 4; // -4 to 4
        const y1 = Math.floor(Math.random() * 9) - 4;
        
        let x2 = x1;
        let y2 = y1;
        
        // Ensure points are different
        while (x2 === x1 && y2 === y1) {
            x2 = Math.floor(Math.random() * 9) - 4;
            y2 = Math.floor(Math.random() * 9) - 4;
        }
        
        this.point1 = [x1, y1];
        this.point2 = [x2, y2];
        
        if (x2 !== x1) {
            this.correctSlope = parseFloat(((y2 - y1) / (x2 - x1)).toFixed(2));
        } else {
            this.correctSlope = Infinity; // Vertical line
        }
        
        this.answered = false;
        document.getElementById('p2-answer').value = '';
        document.getElementById('p2-feedback').textContent = '';
        document.getElementById('p2-feedback').className = 'feedback empty';
        document.getElementById('p2-formula').classList.add('hidden');
        
        this.drawGraph();
    }

    drawGraph() {
        const canvas = document.getElementById('p2-canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 30;

        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = -5; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX + i * scale, 0);
            ctx.lineTo(centerX + i * scale, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, centerY - i * scale);
            ctx.lineTo(width, centerY - i * scale);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        // Draw numbers
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        for (let i = -5; i <= 5; i++) {
            if (i !== 0) {
                ctx.fillText(i, centerX + i * scale, centerY + 5);
            }
        }

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = -5; i <= 5; i++) {
            if (i !== 0) {
                ctx.fillText(i, centerX - 5, centerY - i * scale);
            }
        }

        ctx.fillText('0', centerX - 5, centerY + 12);

        // Draw line through points
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();

        let firstPoint = true;
        for (let x = -5; x <= 5; x += 0.1) {
            if (this.point1[0] !== this.point2[0]) {
                const slope = (this.point2[1] - this.point1[1]) / (this.point2[0] - this.point1[0]);
                const y = this.point1[1] + slope * (x - this.point1[0]);
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;

                if (firstPoint) {
                    ctx.moveTo(canvasX, canvasY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            }
        }
        ctx.stroke();

        // Draw points
        ctx.fillStyle = 'blue';
        this.drawPoint(ctx, this.point1[0], this.point1[1], centerX, centerY, scale, '1');
        this.drawPoint(ctx, this.point2[0], this.point2[1], centerX, centerY, scale, '2');
    }

    drawPoint(ctx, x, y, centerX, centerY, scale, label) {
        const canvasX = centerX + x * scale;
        const canvasY = centerY - y * scale;

        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'darkblue';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`P${label}(${x},${y})`, canvasX, canvasY - 12);
        ctx.fillStyle = 'blue';
    }

    checkAnswer() {
        const userAnswer = parseFloat(document.getElementById('p2-answer').value);
        const feedback = document.getElementById('p2-feedback');

        if (isNaN(userAnswer)) {
            feedback.textContent = '⚠ Please enter a number';
            feedback.className = 'feedback incorrect';
            return;
        }

        const tolerance = 0.01;
        if (Math.abs(userAnswer - this.correctSlope) < tolerance) {
            feedback.textContent = `✓ Correct! The slope is ${this.correctSlope}`;
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = `✗ Incorrect. The correct slope is ${this.correctSlope}. Formula: m = (y₂ - y₁) / (x₂ - x₁) = (${this.point2[1]} - ${this.point1[1]}) / (${this.point2[0]} - ${this.point1[0]}) = ${this.correctSlope}`;
            feedback.className = 'feedback incorrect';
        }
    }

    init() {
        this.generateProblem();

        document.getElementById('p2-help').addEventListener('click', () => {
            document.getElementById('p2-formula').classList.toggle('hidden');
        });

        document.getElementById('p2-check').addEventListener('click', () => this.checkAnswer());
        document.getElementById('p2-next').addEventListener('click', () => this.generateProblem());

        document.getElementById('p2-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
    }
}

// ============================================
// PROBLEM 3: Place the point
// ============================================

class Problem3 {
    constructor() {
        this.targetPoint = null;
        this.userPoint = null;
        this.canvas = null;
        this.isDragging = false;
        this.centerX = 0;
        this.centerY = 0;
        this.scale = 30;
        
        this.init();
    }

    generateProblem() {
        const x = Math.floor(Math.random() * 11) - 5;
        const y = Math.floor(Math.random() * 11) - 5;
        
        this.targetPoint = [x, y];
        this.userPoint = [0, 0]; // Start at origin
        
        document.getElementById('p3-target').textContent = `(${x}, ${y})`;
        document.getElementById('p3-feedback').textContent = '';
        document.getElementById('p3-feedback').className = 'feedback empty';
        
        this.drawGraph();
    }

    drawGraph() {
        const canvas = document.getElementById('p3-canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        this.centerX = width / 2;
        this.centerY = height / 2;

        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        for (let i = -5; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(this.centerX + i * this.scale, 0);
            ctx.lineTo(this.centerX + i * this.scale, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, this.centerY - i * this.scale);
            ctx.lineTo(width, this.centerY - i * this.scale);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, this.centerY);
        ctx.lineTo(width, this.centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX, 0);
        ctx.lineTo(this.centerX, height);
        ctx.stroke();

        // Draw numbers
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        for (let i = -5; i <= 5; i++) {
            if (i !== 0) {
                ctx.fillText(i, this.centerX + i * this.scale, this.centerY + 5);
            }
        }

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = -5; i <= 5; i++) {
            if (i !== 0) {
                ctx.fillText(i, this.centerX - 5, this.centerY - i * this.scale);
            }
        }

        ctx.fillText('0', this.centerX - 5, this.centerY + 12);

        // Draw user point
        ctx.fillStyle = 'blue';
        const pointX = this.centerX + this.userPoint[0] * this.scale;
        const pointY = this.centerY - this.userPoint[1] * this.scale;
        
        ctx.beginPath();
        ctx.arc(pointX, pointY, 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'darkblue';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`(${this.userPoint[0]}, ${this.userPoint[1]})`, pointX, pointY - 15);
    }

    checkAnswer() {
        const feedback = document.getElementById('p3-feedback');
        const distance = Math.sqrt(
            Math.pow(this.userPoint[0] - this.targetPoint[0], 2) +
            Math.pow(this.userPoint[1] - this.targetPoint[1], 2)
        );

        if (distance < 0.5) {
            feedback.textContent = `✓ Correct! You placed the point at (${this.userPoint[0]}, ${this.userPoint[1]})`;
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = `✗ Incorrect. The correct position is (${this.targetPoint[0]}, ${this.targetPoint[1]})`;
            feedback.className = 'feedback incorrect';
        }
    }

    init() {
        this.canvas = document.getElementById('p3-canvas');
        this.generateProblem();

        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.isDragging = false);
        this.canvas.addEventListener('mouseleave', () => this.isDragging = false);

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.isDragging = false);

        document.getElementById('p3-check').addEventListener('click', () => this.checkAnswer());
        document.getElementById('p3-next').addEventListener('click', () => this.generateProblem());
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const pointX = this.centerX + this.userPoint[0] * this.scale;
        const pointY = this.centerY - this.userPoint[1] * this.scale;
        
        const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));
        
        if (distance < 15) {
            this.isDragging = true;
        }
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.updatePointFromCanvas(x, y);
        this.drawGraph();
    }

    handleTouchStart(e) {
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const pointX = this.centerX + this.userPoint[0] * this.scale;
        const pointY = this.centerY - this.userPoint[1] * this.scale;
        
        const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));
        
        if (distance < 15) {
            this.isDragging = true;
        }
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;

        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.updatePointFromCanvas(x, y);
        this.drawGraph();
    }

    updatePointFromCanvas(canvasX, canvasY) {
        let x = (canvasX - this.centerX) / this.scale;
        let y = (this.centerY - canvasY) / this.scale;

        x = Math.round(x);
        y = Math.round(y);

        x = Math.max(-5, Math.min(5, x));
        y = Math.max(-5, Math.min(5, y));

        this.userPoint = [x, y];
    }
}

// ============================================
// Initialize all problems
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const problem1 = new Problem1();
    const problem2 = new Problem2();
    const problem3 = new Problem3();
});
