# 🐳 Docker Bug Squasher - PS1 Arcade Edition

A retro PS1-style 3D arcade game where you squash hilarious Docker pun-bugs! Experience the nostalgic charm of 90s gaming with authentic pixelated graphics, chunky polygon aesthetics, and satisfying bug-squashing gameplay.

**Perfect for DevOps teams, Docker enthusiasts, and anyone who loves retro gaming!**

## 🎮 Game Features

- **🎯 PS1-Style Graphics**: Authentic retro 3D with pixelated textures and chunky polygons
- **🐛 Docker Pun-Bugs**: Race Conditions, Memory Leaks, Zombie Processes, and more!
- **🎮 Third-Person Gameplay**: Katamari Damacy-style camera with WASD movement
- **🏆 Arcade Progression**: Complete objectives, earn high scores, unlock achievements
- **💬 Interactive Elements**: Floating labels, event notifications, and visual feedback
- **📊 High Score System**: Persistent leaderboards with arcade-style victory screens
- **🎵 Retro Sound Effects**: Authentic 8-bit style audio feedback

## 🐛 Docker Bugs to Squash

### Simple Bugs (100 points each)
- **🔴 Race Conditions**: Red containers racing in circles
- **🔵 Memory Leaks**: Blue pipes dripping memory everywhere  
- **🟣 Zombie Processes**: Purple shambling containers wandering aimlessly

### Agent Bugs (300 points, need 3 agent spheres)
- **🟡 Deadlocks**: Yellow containers frozen by literal padlocks
- **🟢 Container Drift**: Green containers slowly floating away

### MCP Bugs (500 points, need MCP component)
- **🟠 Port Conflicts**: Orange cones shaking violently from harbor battles

## 🚀 Quick Start - Multiple Options!

### Option 1: Docker Container (🔥 Recommended - Very Meta!)

**🎯 Super Simple One-Click Launch:**
```bash
# Clone the repository
git clone https://github.com/yourusername/docker-bug-squasher.git
cd docker-bug-squasher

# One-click start (handles everything automatically)
./run.sh
```

**🐳 Docker Compose (Recommended):**
```bash
# Start the game
docker-compose up -d

# Stop the game  
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart
```

**🔧 Manual Docker Commands:**
```bash
# Build and run
docker build -t docker-bug-squasher .
docker run -p 8080:80 --name docker-bug-squasher-game docker-bug-squasher

# Stop
docker stop docker-bug-squasher-game

# Remove
docker rm docker-bug-squasher-game
```

**Then open your browser to:** **http://localhost:8080**

### Option 2: GitHub Pages (🌐 Free Hosting - Zero Setup!)

**🎯 For Players:**
Just visit the live game at: `https://yourusername.github.io/docker-bug-squasher/`

**🔧 For Developers to Deploy:**
1. **Push to GitHub:**
```bash
git clone https://github.com/yourusername/docker-bug-squasher.git
cd docker-bug-squasher
# Make your changes
git add .
git commit -m "Update Docker Bug Squasher"
git push
```

2. **Enable GitHub Pages:**
   - Go to your repo **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** 
   - Folder: **/ (root)**
   - ✅ **Automatic deployment** via GitHub Actions!

3. **Your game goes live automatically at:**
   `https://yourusername.github.io/docker-bug-squasher/`

### Option 3: Local Development Server

**🔧 Any Web Server:**
```bash
# Python
cd public && python -m http.server 8080

# Node.js
cd public && npx http-server -p 8080

# PHP
cd public && php -S localhost:8080

# Then open http://localhost:8080
```

## 🎯 How to Play

### 🎮 Controls
- **WASD**: Move your blocky green avatar around
- **Mouse**: Look around (click to lock cursor, reversed Y-axis like classic games)
- **SPACEBAR**: Squash bugs and collect items (proximity-based interaction)
- **ESC**: Release mouse cursor

### 🏆 Objectives (Complete ALL to win!)
1. **📦 Find and collect resources** - Gather agent spheres and MCP components
2. **🐛 Squash simple bugs (100 pts)** - Easy bugs, no requirements needed
3. **🔵 Collect 3 agent spheres** - Cyan glowing orbs scattered around the world
4. **⚡ Squash agent bugs (300 pts)** - Use 3 agent spheres to tackle harder bugs
5. **🔶 Find MCP components** - Orange cylinders from server stations  
6. **💥 Squash MCP bugs (500 pts)** - High-value bugs needing MCP components
7. **🎯 Achieve 2000+ points** - Rack up your score for the perfect run!

### 🔄 Gameplay Loop
1. **🏃 Explore** the retro 3D world with your third-person avatar
2. **📦 Collect resources** by walking up to items and pressing spacebar
3. **🔍 Hunt down bugs** using floating labels to identify them
4. **⚖️ Strategic resource management** - save resources for high-value bugs
5. **✅ Complete all objectives** to trigger the arcade victory sequence
6. **🏆 Compete for high scores** and achieve "Perfect Run" status!

## 🏅 Perfect Run Challenge

Achieve **ALL** of these for the coveted "Perfect Run" status:
- **🎯 3000+ points** (well above the 2000 requirement)
- **🐛 15+ bugs squashed** (clean up the environment thoroughly)
- **⏱️ Fast completion time** (efficient resource management)

Perfect Runs are highlighted in **GOLD** on the leaderboard! 🏆

## 🎨 The Authentic PS1 Experience

This game captures the genuine feel of 90s PlayStation games:

### 🎮 Visual Authenticity
- **📐 Chunky low-poly models** with flat-shaded surfaces
- **🖼️ Pixelated textures** rendered with nearest-neighbor filtering  
- **🎨 Limited color palettes** with retro dithering effects
- **📉 Geometric instability** - vertices wobble like real PS1 hardware limitations
- **🌫️ Fog-based draw distance** hiding the horizon like original hardware constraints
- **⏱️ 30 FPS feel** with authentic timing and movement

### 🎵 Audio Design
- **🔊 8-bit sound effects** for interactions and events
- **🎼 Victory melody** with classic arcade ascending notes
- **💥 Satisfying audio feedback** for every bug squash

## 🛠️ Technical Architecture

### 🐳 Docker Implementation
- **Base**: `nginx:alpine` (lightweight 30MB image)
- **Web Server**: Optimized nginx with gzip compression
- **Security**: Complete security headers and best practices
- **Health Check**: Available at `/health` endpoint
- **Performance**: Static asset caching and optimization

### 🌐 Web Technologies
- **Frontend**: Pure HTML5, CSS3, JavaScript (no frameworks!)
- **3D Engine**: Three.js with WebGL rendering
- **Storage**: localStorage for persistent high scores
- **Responsive**: Works on desktop, tablet, and mobile
- **Progressive Loading**: CDN fallbacks and error handling

### 📁 Project Structure
```
docker-bug-squasher/
├── 📁 public/                    # Game files
│   ├── index.html               # Main game interface
│   └── game.js                  # Complete game logic (30KB)
├── 🐳 Dockerfile                # Container definition
├── ⚙️ docker-compose.yml         # Easy deployment config  
├── 🌐 nginx.conf                # Optimized web server config
├── 🚀 run.sh                    # One-click launcher script
├── 📚 README.md                 # This comprehensive guide
├── 🚫 .dockerignore             # Docker build optimization
└── 📁 .github/workflows/        # GitHub Actions for auto-deployment
    └── deploy.yml               # Automatic Pages deployment
```

## 🎭 Perfect for DevOps Teams

This game speaks directly to the DevOps experience with hilarious Docker metaphors:

### 🐛 Real Issues as Game Enemies
- **🏃‍♂️ Race Conditions** that literally race around in circles
- **💧 Memory Leaks** as actual dripping pipes flooding your system
- **🧟‍♂️ Zombie Processes** shambling around your infrastructure
- **🔒 Deadlocks** as literal padlocks freezing your containers
- **☁️ Container Drift** showing your infrastructure floating away from specifications
- **⚔️ Port Conflicts** as harbors having boxing matches

### 🎯 Team Building Benefits
- **🤝 Team bonding** - compete for high scores during breaks
- **🎪 Conference demos** - everyone loves retro gaming + Docker humor
- **😌 Stress relief** - physically squash your deployment frustrations  
- **📚 Education** - teach Docker concepts through interactive play
- **🎉 Onboarding** - fun way to introduce new team members to Docker terminology

## 💡 High Score Pro Tips

### 🎯 Strategy Guide
- **⚡ Prioritize simple bugs early** for quick points and momentum building
- **🔵 Collect all 6 agent spheres** but use them strategically on high-value targets
- **🔶 Save MCP components** for the highest-value Port Conflicts (500pts each)
- **🏃‍♂️ Move efficiently** - bugs spawn every 6 seconds, so stay mobile
- **🧠 Learn bug behaviors** - Race Conditions move predictably, Memory Leaks stay stationary
- **⏰ Perfect timing** - wait for multiple high-value bugs before spending resources

### 🎮 Advanced Techniques
- **📍 Memorize collectible spawn locations** for faster resource gathering
- **🔄 Plan efficient movement routes** to maximize bug encounters
- **⚖️ Resource management** - never use 3 agents on a 300-point bug if 500-point bugs are available
- **🎯 Combo scoring** - squash multiple bugs quickly for momentum

## 🌐 Deployment Options Comparison

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **🐳 Docker** | Self-contained, runs anywhere, very meta! | Requires Docker installed | Developers, teams with Docker |
| **📄 GitHub Pages** | Free hosting, no installation, instant access | Limited to static content | Sharing with anyone, demos |
| **🖥️ Local Server** | Full control, offline capable | Manual setup required | Development, testing |

## 🚀 Sharing Your Game

### 🐳 Docker Hub Distribution
```bash
# Build and tag for Docker Hub
docker build -t yourusername/docker-bug-squasher .
docker push yourusername/docker-bug-squasher

# Others can run instantly with:
docker run -p 8080:80 yourusername/docker-bug-squasher
```

### 🌐 Direct Web Access
Simply share your GitHub Pages URL - no installation needed!
`https://yourusername.github.io/docker-bug-squasher/`

### 📱 Social Media Ready
Perfect screenshots and GIFs for sharing:
- Retro PS1 aesthetics are Instagram gold 📸
- Bug squashing action is satisfying to watch 🎬
- Docker puns are Twitter-ready content 🐦

## 🔧 Development & Customization

### 🎮 Modifying the Game
Want to add your own Docker puns or change gameplay?

1. **Edit game logic**: `public/game.js`
2. **Modify UI/styling**: `public/index.html`
3. **Add new bug types**: Search for `bugTypes` array in `game.js`
4. **Adjust difficulty**: Modify spawn rates, point values, movement speeds

### 🐳 Container Customization
- **Custom nginx config**: Edit `nginx.conf`
- **Different base image**: Modify `Dockerfile`
- **Environment variables**: Add to `docker-compose.yml`

## 🆘 Troubleshooting

### Common Issues

**❓ Black screen or game won't load:**
- Check browser console (F12) for JavaScript errors
- Ensure WebGL is supported in your browser
- Try a different browser or disable browser extensions

**❓ Docker container won't start:**
```bash
# Check if port 8080 is already in use
docker ps
lsof -i :8080

# Use different port
docker run -p 3000:80 docker-bug-squasher
```

**❓ GitHub Pages not updating:**
- Check **Actions** tab for deployment status
- Verify **Pages** settings point to correct branch
- Wait up to 10 minutes for propagation

**❓ Performance issues:**
- Close other browser tabs
- Check if hardware acceleration is enabled
- Lower browser zoom level for better performance

## 🎉 Community & Support

### 🤝 Contributing
Want to add features or fix bugs?
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### 🐛 Reporting Issues
Found a bug (not the fun Docker kind)? 
- Open an issue on GitHub with details
- Include browser type, OS, and error messages
- Screenshots or videos are super helpful!

### 💬 Community
Share your experiences:
- **Twitter**: Tweet your high scores with #DockerBugSquasher
- **LinkedIn**: Share with your DevOps network  
- **Reddit**: r/docker, r/devops communities love this stuff
- **Discord/Slack**: Perfect for team channels

## 📈 Roadmap

Planned future features:
- 🌟 **More bug types**: Stack Overflow towers, Build Failure construction sites
- 🎵 **Background music**: Chiptune soundtrack
- 🏆 **Achievements system**: Unlock titles and badges
- 🌍 **Multiplayer mode**: Cooperative bug squashing
- 📱 **Mobile optimization**: Touch controls for phones/tablets
- 🎨 **Mod support**: Custom bug types and environments

---

## ⭐ Star This Repository!

If you enjoyed Docker Bug Squasher, please **⭐ star this repository** to help others discover it!

**Built with ❤️ for the DevOps community**

*May your containers never drift, your ports never conflict, and your processes never become zombies! 🐳✨*

---

### 🎮 Ready to Play?

**Choose your deployment method above and start squashing those Docker bugs!**

*Perfect for coffee breaks, team building, conference demos, and explaining Docker concepts in the most entertaining way possible.* 🎯