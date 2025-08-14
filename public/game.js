// Docker Bug Squasher - PS1 Arcade Edition
// A retro 3D game where you squash Docker pun-bugs!
// This script assumes Three.js is already loaded

// Docker Bug Squashing Game with Arcade Completion
function initDockerGame() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('❌ Three.js not loaded!');
        document.getElementById('status').innerHTML = '❌ Three.js not loaded. Please refresh.';
        return;
    }
    
    document.getElementById('status').style.display = 'none';
    
    let scene, camera, renderer, player;
    let keys = {};
    let bugs = [];
    let agentSpheres = [];
    let mcpComponents = [];
    let gameObjects = [];
    let labels = [];
    
    // Game state
    let score = 0;
    let collectedAgents = 0;
    let hasMCPComponent = false;
    let bugSpawnTimer = 0;
    let gameStartTime = Date.now();
    let totalBugsSquashed = 0;
    let gameComplete = false;
    
    let objectives = {
        collectResources: false,
        squashSimpleBug: false,
        collect3Agents: false,
        squashAgentBug: false,
        findMCPComponent: false,
        squashMCPBug: false,
        achieve2000Points: false
    };
    
    const MOVE_SPEED = 0.15;
    const MOUSE_SENSITIVITY = 0.002;
    const BUG_SPAWN_INTERVAL = 6000; // 6 seconds

    console.log("🐳 Initializing Docker Bug Squasher Arcade Edition...");
    
    try {
        // Create scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x1a1a2e, 15, 60);
        scene.background = new THREE.Color(0x1a1a2e);
        
        // Create third-person camera
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Create renderer with PS1 style
        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.imageRendering = 'pixelated';
        document.getElementById('gameContainer').appendChild(renderer.domElement);
        
        console.log("✅ WebGL Renderer created");
        
        // Create player avatar (simple blocky character)
        const playerGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.3);
        const playerMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff88 });
        player = {
            mesh: new THREE.Mesh(playerGeometry, playerMaterial),
            position: new THREE.Vector3(0, 0.6, 5),
            rotation: { x: 0, y: 0 },
            speed: MOVE_SPEED
        };
        player.mesh.position.copy(player.position);
        scene.add(player.mesh);
        
        // Create ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 8, 8);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2a2a4a,
            wireframe: false
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);
        
        // Create some environment objects
        createEnvironment();
        
        // Create collectibles
        createCollectibles();
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        console.log("✅ Scene created");
        
        // Event listeners
        document.addEventListener('keydown', (e) => { 
            if (!gameComplete) keys[e.key.toLowerCase()] = true; 
        });
        document.addEventListener('keyup', (e) => { 
            if (!gameComplete) keys[e.key.toLowerCase()] = false; 
        });
        document.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement && !gameComplete) {
                player.rotation.y -= e.movementX * MOUSE_SENSITIVITY;
                // Reversed Y-axis
                player.rotation.x += e.movementY * MOUSE_SENSITIVITY;
                player.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/6, player.rotation.x));
            }
        });
        document.addEventListener('click', () => {
            if (!gameComplete) {
                document.body.requestPointerLock();
            }
        });
        
        // Game loop
        let lastBugSpawn = Date.now();
        
        function animate() {
            requestAnimationFrame(animate);
            
            if (!gameComplete) {
                // Handle movement
                handleMovement();
                
                // Update third-person camera
                updateCamera();
                
                // Handle spacebar interactions
                if (keys[' ']) {
                    handleSpacebarAction();
                    keys[' '] = false; // Prevent spam
                }
                
                // Spawn bugs periodically
                if (Date.now() - lastBugSpawn > BUG_SPAWN_INTERVAL) {
                    spawnRandomBugs();
                    lastBugSpawn = Date.now();
                }
                
                // Update bugs
                updateBugs();
                
                // Update floating labels
                updateFloatingLabels();
                
                // Update objectives and check for completion
                updateObjectives();
                checkLevelCompletion();
            }
            
            // Render
            renderer.render(scene, camera);
            
            // Update UI
            updateDebug();
        }
        
        function checkLevelCompletion() {
            const allObjectivesComplete = Object.values(objectives).every(obj => obj === true);
            
            if (allObjectivesComplete && !gameComplete) {
                gameComplete = true;
                showVictoryScreen();
            }
        }
        
        function showVictoryScreen() {
            const playTime = Date.now() - gameStartTime;
            const minutes = Math.floor(playTime / 60000);
            const seconds = Math.floor((playTime % 60000) / 1000);
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            const stats = {
                timePlayed: timeString,
                bugsSquashed: totalBugsSquashed,
                perfectRun: score >= 3000 && totalBugsSquashed >= 15 ? 'YES' : 'NO'
            };
            
            // Update victory screen
            document.getElementById('finalScore').textContent = score.toLocaleString();
            document.getElementById('timePlayed').textContent = stats.timePlayed;
            document.getElementById('bugsSquashed').textContent = stats.bugsSquashed;
            document.getElementById('perfectRun').textContent = stats.perfectRun;
            
            // Save and display high scores
            const currentScoreIndex = saveHighScore(score, stats);
            displayHighScores(currentScoreIndex);
            
            // Show victory screen with delay for dramatic effect
            setTimeout(() => {
                document.getElementById('highScoreScreen').style.display = 'flex';
                
                // Play victory sound
                playVictorySound();
                
                // Show celebration message
                showEventText('🎉 LEVEL COMPLETE! ALL OBJECTIVES ACHIEVED! 🎉', '#ffff00');
                
            }, 2000);
        }
        
        function playVictorySound() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Play ascending victory melody
                const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
                
                notes.forEach((freq, index) => {
                    setTimeout(() => {
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                        
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.5);
                    }, index * 200);
                });
            } catch (e) {
                console.log('Audio not available');
            }
        }
        
        function createEnvironment() {
            // Create some Docker-themed structures
            const colors = [0x4a4a8a, 0x6a4a8a, 0x8a4a6a];
            
            for (let i = 0; i < 8; i++) {
                const geometry = new THREE.BoxGeometry(
                    1 + Math.random() * 2,
                    2 + Math.random() * 3,
                    1 + Math.random() * 2
                );
                const material = new THREE.MeshLambertMaterial({ 
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
                
                const building = new THREE.Mesh(geometry, material);
                building.position.set(
                    (Math.random() - 0.5) * 40,
                    building.geometry.parameters.height / 2,
                    (Math.random() - 0.5) * 40
                );
                
                scene.add(building);
                gameObjects.push(building);
            }
        }
        
        function createCollectibles() {
            // Create agent spheres (cyan)
            for (let i = 0; i < 6; i++) {
                const geometry = new THREE.SphereGeometry(0.3, 8, 6);
                const material = new THREE.MeshLambertMaterial({ 
                    color: 0x00ffff,
                    emissive: 0x003333
                });
                
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(
                    (Math.random() - 0.5) * 30,
                    0.5,
                    (Math.random() - 0.5) * 30
                );
                sphere.userData = { 
                    type: 'agent', 
                    collected: false,
                    name: 'Agent Sphere',
                    description: 'Collect 3 for agent bugs'
                };
                
                scene.add(sphere);
                agentSpheres.push(sphere);
            }
            
            // Create MCP server components (orange cylinders)
            for (let i = 0; i < 3; i++) {
                const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8);
                const material = new THREE.MeshLambertMaterial({ 
                    color: 0xff6600,
                    emissive: 0x331100
                });
                
                const component = new THREE.Mesh(geometry, material);
                component.position.set(
                    (Math.random() - 0.5) * 35,
                    0.4,
                    (Math.random() - 0.5) * 35
                );
                component.userData = { 
                    type: 'mcp', 
                    collected: false,
                    name: 'MCP Component',
                    description: 'Needed for MCP bugs'
                };
                
                scene.add(component);
                mcpComponents.push(component);
            }
        }
        
        function spawnRandomBugs() {
            if (gameComplete) return;
            
            const bugCount = Math.floor(Math.random() * 3) + 1; // 1-3 bugs
            
            for (let i = 0; i < bugCount; i++) {
                createRandomBug();
            }
            
            showEventText(`${bugCount} new bug${bugCount > 1 ? 's' : ''} spawned!`, '#ff6666');
        }
        
        function createRandomBug() {
            const bugTypes = [
                { name: 'Race Condition', color: 0xff0000, points: 100, type: 'simple', description: 'Racing in circles' },
                { name: 'Memory Leak', color: 0x0066ff, points: 100, type: 'simple', description: 'Dripping memory' },
                { name: 'Zombie Process', color: 0x9900ff, points: 100, type: 'simple', description: 'Shambling around' },
                { name: 'Deadlock', color: 0xffff00, points: 300, type: 'agent', description: 'Need 3 agents' },
                { name: 'Container Drift', color: 0x00ff00, points: 300, type: 'agent', description: 'Need 3 agents' },
                { name: 'Port Conflict', color: 0xff6600, points: 500, type: 'mcp', description: 'Need MCP component' }
            ];
            
            const bugData = bugTypes[Math.floor(Math.random() * bugTypes.length)];
            
            let geometry, material;
            
            if (bugData.name === 'Race Condition') {
                geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
            } else if (bugData.name === 'Memory Leak') {
                geometry = new THREE.CylinderGeometry(0.2, 0.4, 1, 8);
            } else if (bugData.name === 'Port Conflict') {
                geometry = new THREE.ConeGeometry(0.5, 1, 6);
            } else {
                geometry = new THREE.BoxGeometry(0.6, 1, 0.6);
            }
            
            material = new THREE.MeshLambertMaterial({ 
                color: bugData.color,
                emissive: new THREE.Color(bugData.color).multiplyScalar(0.2)
            });
            
            const bug = new THREE.Mesh(geometry, material);
            bug.position.set(
                (Math.random() - 0.5) * 30,
                0.5,
                (Math.random() - 0.5) * 30
            );
            
            bug.userData = {
                type: 'bug',
                bugType: bugData.type,
                name: bugData.name,
                description: bugData.description,
                points: bugData.points,
                moveSpeed: 0.02 + Math.random() * 0.03,
                direction: Math.random() * Math.PI * 2
            };
            
            scene.add(bug);
            bugs.push(bug);
            
            console.log(`🐛 Spawned: ${bugData.name}`);
        }
        
        function updateBugs() {
            bugs.forEach(bug => {
                // Simple AI movement
                if (bug.userData.name === 'Race Condition') {
                    // Race in circles
                    bug.rotation.y += 0.1;
                    bug.position.x += Math.cos(bug.rotation.y) * bug.userData.moveSpeed;
                    bug.position.z += Math.sin(bug.rotation.y) * bug.userData.moveSpeed;
                } else if (bug.userData.name === 'Memory Leak') {
                    // Bob up and down
                    bug.position.y = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
                } else if (bug.userData.name === 'Zombie Process') {
                    // Shamble randomly
                    bug.userData.direction += (Math.random() - 0.5) * 0.1;
                    bug.position.x += Math.cos(bug.userData.direction) * bug.userData.moveSpeed;
                    bug.position.z += Math.sin(bug.userData.direction) * bug.userData.moveSpeed;
                } else if (bug.userData.name === 'Container Drift') {
                    // Float upward slowly
                    bug.position.y += 0.005;
                } else if (bug.userData.name === 'Port Conflict') {
                    // Shake violently
                    bug.position.x += (Math.random() - 0.5) * 0.1;
                    bug.position.z += (Math.random() - 0.5) * 0.1;
                }
                
                // Rotate for visual interest
                bug.rotation.x += 0.01;
                bug.rotation.z += 0.01;
            });
        }
        
        function updateFloatingLabels() {
            if (gameComplete) return;
            
            // Clear old labels
            labels.forEach(label => {
                if (label.element && label.element.parentNode) {
                    label.element.parentNode.removeChild(label.element);
                }
            });
            labels = [];
            
            // Create labels for bugs
            bugs.forEach(bug => {
                createFloatingLabel(bug, `${bug.userData.name} (${bug.userData.points}pts)`, bug.userData.description);
            });
            
            // Create labels for collectibles
            [...agentSpheres, ...mcpComponents].forEach(item => {
                if (!item.userData.collected) {
                    createFloatingLabel(item, item.userData.name, item.userData.description);
                }
            });
        }
        
        function createFloatingLabel(object, title, description) {
            const vector = new THREE.Vector3();
            object.getWorldPosition(vector);
            vector.y += 1.5; // Float above object
            vector.project(camera);
            
            // Convert to screen coordinates
            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
            
            // Only show labels that are in front of camera and on screen
            if (vector.z < 1 && x > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight) {
                const label = document.createElement('div');
                label.className = 'floating-label';
                label.innerHTML = `<strong>${title}</strong><br><small>${description}</small>`;
                label.style.left = x + 'px';
                label.style.top = y + 'px';
                label.style.transform = 'translate(-50%, -100%)';
                
                document.body.appendChild(label);
                
                labels.push({ element: label, object: object });
            }
        }
        
        function showEventText(message, color = '#ffff00') {
            const eventText = document.createElement('div');
            eventText.className = 'event-text';
            eventText.textContent = message;
            eventText.style.color = color;
            eventText.style.left = '50%';
            eventText.style.top = '30%';
            eventText.style.transform = 'translateX(-50%)';
            
            document.body.appendChild(eventText);
            
            // Remove after animation
            setTimeout(() => {
                if (eventText.parentNode) {
                    eventText.parentNode.removeChild(eventText);
                }
            }, 2000);
        }
        
        function updateObjectives() {
            // Check objectives
            if (collectedAgents > 0 || hasMCPComponent) {
                objectives.collectResources = true;
            }
            
            if (collectedAgents >= 3) {
                objectives.collect3Agents = true;
            }
            
            if (hasMCPComponent) {
                objectives.findMCPComponent = true;
            }
            
            if (score >= 2000) {
                objectives.achieve2000Points = true;
            }
            
            // Update punch list UI
            const objectivesList = document.getElementById('objectives');
            if (objectivesList) {
                objectivesList.innerHTML = `
                    <div class="punch-item ${objectives.collectResources ? 'completed' : 'active'}">• Find and collect resources</div>
                    <div class="punch-item ${objectives.squashSimpleBug ? 'completed' : ''}">• Squash simple bugs (100 pts)</div>
                    <div class="punch-item ${objectives.collect3Agents ? 'completed' : ''}">• Collect 3 agent spheres</div>
                    <div class="punch-item ${objectives.squashAgentBug ? 'completed' : ''}">• Squash agent bugs (300 pts)</div>
                    <div class="punch-item ${objectives.findMCPComponent ? 'completed' : ''}">• Find MCP components</div>
                    <div class="punch-item ${objectives.squashMCPBug ? 'completed' : ''}">• Squash MCP bugs (500 pts)</div>
                    <div class="punch-item ${objectives.achieve2000Points ? 'completed' : ''}">• Achieve 2000+ points</div>
                `;
            }
        }
        
        function handleMovement() {
            const moveVector = new THREE.Vector3();
            
            if (keys['w']) moveVector.z -= player.speed;
            if (keys['s']) moveVector.z += player.speed;
            if (keys['a']) moveVector.x -= player.speed;
            if (keys['d']) moveVector.x += player.speed;
            
            // Apply rotation to movement
            moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), player.rotation.y);
            player.position.add(moveVector);
            player.mesh.position.copy(player.position);
            
            // Update mesh rotation
            player.mesh.rotation.y = player.rotation.y;
        }
        
        function updateCamera() {
            // Third-person camera behind and above player
            const cameraDistance = 5;
            const cameraHeight = 3;
            
            const cameraX = player.position.x + Math.sin(player.rotation.y) * cameraDistance;
            const cameraZ = player.position.z + Math.cos(player.rotation.y) * cameraDistance;
            const cameraY = player.position.y + cameraHeight + Math.sin(player.rotation.x) * 2;
            
            camera.position.set(cameraX, cameraY, cameraZ);
            camera.lookAt(player.position);
        }
        
        function handleSpacebarAction() {
            const interactionRange = 2.5;
            
            // Check for bugs to squash
            bugs.forEach((bug, index) => {
                const distance = player.position.distanceTo(bug.position);
                if (distance < interactionRange) {
                    if (canSquashBug(bug)) {
                        squashBug(bug, index);
                    } else {
                        const requirement = getBugRequirement(bug);
                        showEventText(`❌ Need ${requirement} to squash ${bug.userData.name}!`, '#ff6666');
                    }
                }
            });
            
            // Check for collectibles
            [...agentSpheres, ...mcpComponents].forEach(item => {
                if (!item.userData.collected) {
                    const distance = player.position.distanceTo(item.position);
                    if (distance < interactionRange) {
                        collectItem(item);
                    }
                }
            });
        }
        
        function canSquashBug(bug) {
            if (bug.userData.bugType === 'simple') return true;
            if (bug.userData.bugType === 'agent') return collectedAgents >= 3;
            if (bug.userData.bugType === 'mcp') return hasMCPComponent;
            return false;
        }
        
        function getBugRequirement(bug) {
            if (bug.userData.bugType === 'agent') return '3 agent spheres';
            if (bug.userData.bugType === 'mcp') return 'MCP component';
            return 'nothing';
        }
        
        function squashBug(bug, index) {
            // Add points
            score += bug.userData.points;
            totalBugsSquashed++;
            
            // Update objectives
            if (bug.userData.bugType === 'simple') {
                objectives.squashSimpleBug = true;
            } else if (bug.userData.bugType === 'agent') {
                objectives.squashAgentBug = true;
                collectedAgents = Math.max(0, collectedAgents - 3);
            } else if (bug.userData.bugType === 'mcp') {
                objectives.squashMCPBug = true;
                hasMCPComponent = false;
            }
            
            // Show event text
            showEventText(`💥 SQUASHED ${bug.userData.name}! +${bug.userData.points} pts`, '#00ff00');
            
            // Create particles
            createParticleEffect(bug.position, bug.material.color);
            
            // Remove bug
            scene.remove(bug);
            bugs.splice(index, 1);
            
            console.log(`💥 Squashed: ${bug.userData.name} (+${bug.userData.points} points)`);
        }
        
        function collectItem(item) {
            item.userData.collected = true;
            item.visible = false;
            
            if (item.userData.type === 'agent') {
                collectedAgents = Math.min(3, collectedAgents + 1);
                showEventText(`🔵 Agent Sphere Collected! (${collectedAgents}/3)`, '#00ffff');
                console.log(`🔵 Collected agent sphere! (${collectedAgents}/3)`);
            } else if (item.userData.type === 'mcp') {
                hasMCPComponent = true;
                showEventText(`🔶 MCP Component Acquired!`, '#ff6600');
                console.log(`🔶 Collected MCP component!`);
            }
        }
        
        function createParticleEffect(position, color) {
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
                const material = new THREE.MeshBasicMaterial({ color: color });
                const particle = new THREE.Mesh(geometry, material);
                
                particle.position.copy(position);
                particle.position.add(new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    Math.random() * 2,
                    (Math.random() - 0.5) * 2
                ));
                
                scene.add(particle);
                
                // Remove particle after 1 second
                setTimeout(() => {
                    scene.remove(particle);
                }, 1000);
            }
        }
        
        function updateDebug() {
            const debugElement = document.getElementById('debug');
            if (debugElement) {
                const playTime = Date.now() - gameStartTime;
                const minutes = Math.floor(playTime / 60000);
                const seconds = Math.floor((playTime % 60000) / 1000);
                
                debugElement.innerHTML = `
                    Score: ${score}<br>
                    Agent Spheres: ${collectedAgents}/3<br>
                    MCP Component: ${hasMCPComponent ? 'Yes' : 'No'}<br>
                    Active Bugs: ${bugs.length}<br>
                    Time: ${minutes}:${seconds.toString().padStart(2, '0')}<br>
                    Status: ${gameComplete ? 'LEVEL COMPLETE!' : 'ARCADE MODE!'} 🎮
                `;
            }
        }
        
        // Start animation loop
        animate();
        
        console.log("🚀 Docker Bug Squasher Arcade Edition started!");
        updateDebug();
        
    } catch (error) {
        console.error('❌ Game initialization error:', error);
        document.getElementById('status').innerHTML = '❌ Game Error: ' + error.message;
        document.getElementById('status').style.display = 'block';
    }
}

// Make function globally accessible
window.initDockerGame = initDockerGame;