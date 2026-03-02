# Lorna Dev - Engineering Consulting Website

A production-grade marketing website for Lorna Dev, an engineering consulting firm specializing in software development, systems architecture, automation, and workflow design.

## 🚀 Tech Stack

- **Framework**: Astro 4.x with React islands
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for content collections
- **Email**: Resend API
- **Database**: SQLite for form submissions
- **Deployment**: Vercel/Netlify ready

## 📋 Prerequisites

- **Node.js** 18+
- **pnpm** (see [installation](https://pnpm.io/installation))
- **Git**

## 🛠️ Local Development Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd lorna-dev
   pnpm install
   ```

2. **Environment configuration**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   # Required for email functionality
   RESEND_API_KEY=your_resend_api_key_here
   CONTACT_EMAIL=hello@lornadev.com

   # Optional analytics
   GA_MEASUREMENT_ID=GA-XXXXXXXXXX

   # Admin access for viewing submissions
   ADMIN_TOKEN=your_secure_admin_token_here
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

   Visit `http://localhost:4321`

## 📜 Available Scripts

```bash
# Development
pnpm dev             # Start dev server
pnpm start           # Alias for dev

# Building
pnpm build           # Production build with checks
pnpm preview         # Preview production build

# Code Quality
pnpm lint            # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format          # Format with Prettier
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable components
│   ├── sections/        # Page sections
│   ├── Navigation.astro
│   ├── Footer.astro
│   └── ContactForm.tsx
├── content/             # MDX content collections
│   ├── solutions/      # Service offerings
│   ├── work/          # Case studies
│   └── insights/      # Blog posts (future)
├── layouts/            # Page layouts
├── pages/              # Route pages
│   ├── api/           # API endpoints
│   └── [...dynamic]   # Dynamic routes
├── lib/               # Utilities and types
└── types/             # TypeScript definitions

public/                 # Static assets
```

## 🎯 SEO Implementation

### ✅ Completed SEO Features

- **Meta Tags**: Title, description, Open Graph, Twitter cards
- **Structured Data**: JSON-LD for Organization, ProfessionalService, WebSite
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Proper crawling directives
- **Canonical URLs**: Automatic canonical tag generation
- **Performance**: Optimized for Core Web Vitals

### 🔍 SEO Checklist

- [x] Unique title tags per page (50-60 characters)
- [x] Compelling meta descriptions (150-160 characters)
- [x] H1 tags unique per page
- [x] Semantic HTML structure
- [x] Alt text for images (when added)
- [x] Internal linking strategy
- [x] Fast loading times (< 3s)
- [x] Mobile-responsive design
- [x] HTTPS ready
- [x] Clean URL structure

### 🎯 Target Keywords

Primary: engineering consulting, software engineering consulting
Secondary: systems automation consulting, workflow automation, systems architecture consulting
Long-tail: software implementation services, production-ready development

## 📧 Email Configuration

The contact form uses Resend for reliable email delivery:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Configure domain authentication
4. Add API key to `.env`

Emails include:
- Formatted HTML with all submission details
- Submission metadata (IP, timestamp)
- Direct reply-to functionality

## 💾 Database Setup

Form submissions are stored in SQLite:

- **Location**: `contact_submissions.db` (created automatically)
- **Tables**: submissions (id, name, email, company, project_type, budget, message, metadata)
- **Backup**: Regular database backups recommended for production

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository**:
   ```bash
   # Install Vercel CLI
   pnpm add -g vercel

   # Deploy
   vercel
   ```

2. **Environment variables**: Add to Vercel dashboard
3. **Domain**: Configure custom domain (lornadev.com)

### Netlify

1. **Build settings**:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: 18+

2. **Environment variables**: Configure in Netlify dashboard

### Manual Deployment

```bash
# Build for production
pnpm build

# Serve static files
pnpm dlx serve dist
```

## 🔍 Lighthouse Targets

Current targets (aim for all green scores):

- **Performance**: 95+
- **SEO**: 100
- **Best Practices**: 100
- **Accessibility**: 95+

### Performance Optimizations

- [x] Astro's built-in optimizations
- [x] Tailwind CSS purging
- [x] Image optimization (when images added)
- [x] Font loading optimization
- [x] Critical CSS inlining
- [x] JavaScript minimization

## ♿ Accessibility (WCAG 2.1 AA)

### ✅ Implemented Features

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly
- Alt text for images
- Skip links (can be added if needed)

## 📊 Analytics Setup

### Plausible Analytics (Privacy-Focused)

- Automatically enabled on production domain
- No cookies, GDPR compliant
- Real-time visitor analytics

### Google Analytics 4 (Optional)

- Configure `GA_MEASUREMENT_ID` in environment
- Includes consent management hooks
- Conversion tracking ready

## 🔧 Content Management

### Adding Solutions

1. Create new MDX file in `src/content/solutions/`
2. Follow the schema in `src/content/config.ts`
3. Set `order` for display priority
4. Add `ctaText` for custom call-to-action

### Adding Case Studies

1. Create MDX file in `src/content/work/`
2. Include problem, approach, results, stack
3. Set `featured: true` for homepage display
4. Add `order` for sorting

## 🧪 Testing

### Manual Testing Checklist

- [ ] Contact form submission (success & error states)
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Form validation
- [ ] Email delivery
- [ ] Page load performance
- [ ] SEO meta tags
- [ ] Accessibility compliance

### Automated Testing

```bash
# Run linting
pnpm lint

# Type checking
pnpm build  # Includes TypeScript checks

# Lighthouse testing
pnpm dlx lighthouse http://localhost:4321 --output html
```

## 🔒 Security

- **Form Protection**: Honeypot spam prevention
- **Rate Limiting**: Basic IP-based rate limiting
- **Input Validation**: Server and client-side validation
- **HTTPS Only**: All connections encrypted
- **Dependency Updates**: Regular security updates

## 🚨 Troubleshooting

### Common Issues

**Form not sending emails**:
- Check Resend API key configuration
- Verify domain authentication in Resend
- Check server logs for errors

**Build failures**:
- Ensure Node.js 18+
- Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Check TypeScript errors

**Styling issues**:
- Verify Tailwind configuration
- Check for CSS conflicts
- Test in multiple browsers

## 📈 Performance Monitoring

### Key Metrics to Track

- **Core Web Vitals**: LCP, FID, CLS
- **Lighthouse Scores**: Monthly performance audits
- **Form Conversion**: Contact form submission rates
- **Page Load Times**: Monitor with analytics
- **Error Rates**: Server and client-side errors

## 🔄 Future Enhancements

### Phase 2 Features

1. **Blog/Insights Section**: MDX-powered blog with RSS
2. **Advanced Analytics**: Custom conversion tracking
3. **Multi-language Support**: i18n implementation
4. **Advanced SEO**: Rich snippets, video schema
5. **Performance**: Service worker, advanced caching

### Content Expansion

1. **More Case Studies**: Real client examples
2. **Service Packages**: Fixed-price offerings
3. **Resource Library**: Guides, templates, tools
4. **Newsletter**: Email marketing integration

## 📞 Support

For technical issues or questions:
- **Email**: hello@lornadev.com
- **Issues**: GitHub repository issues
- **Documentation**: This README and inline code comments

## 📄 License

This project is proprietary to Lorna Dev. See individual files for licensing information.

---

**Built with ❤️ using Astro, React, and TypeScript**

                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
       +++                                                                                                                                                                                                          ***       
       *#*+++==                                                                                                                                                                                                ++**#%%#       
       *#%*+++++++++                                                                                                                                                                                      ++***####%@%#       
        *%%+++++++++++++=+                                                                                                                                                                           ++**#########%@@%        
         #%*+++++++++++++++++++++++                                                                                                                                                          +***#################%@%         
         *##%#*++++++++++++++++++++++++****++*++++                                                                                                                              +++***####################***##%%@@%#         
          *#***##%%%#**++++++++++++++++++++++++++++++++*********+*++                                                                                         +++************************#######*#*****##%%%%%%##*#%#          
            =++++++***##%%%%##**++++++++++++++++++++++++++++++++++++++++++******************************************************************************************************************###%%%%%%%%###*******+            
             +++++*###***++++***##%%%%%###***+++++++++++++++++++++++++++++++++++++++++++++++++++*++*****************************************************************************####%%%%@@%%%####****####%%#*****             
                  +*#%%%%%%%%####***++++****###%%%%%%%%###*****++++++++++++++++++++++++++++++++++++++++++++++++++***+++********************************************###%%%%%@@%%%%%%#####**####%%%%%%%%%%%%#                   
                  ==+***##%%%%%%%%%%%%%%######*************#####%%%%%%%%%%%%%%%######************++++++++++++++++++++++******************#######%%%%%%%%%%%%%%%%%%#######*########%%%%%%%%@@@%%%%%%%%%%####                   
                  ====+++****###%%%%%%%%%%%%%%%%%%%%%%%%%%%######*******************########%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#########***********######%%%%%%%%%%%%@@@@@@@@@@%%%%%%%%%%######***                   
                  =======+++++****#####%%%%%%%%%%%%%%@%%%%%%%@@@@@@%%%%%%%%%%%%%%%%%%###############**********************################%%%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%########******+                   
                   *#**********+++******#########%%%%%%***###%%%@@@@@@@@@@@@@@@@@@@@%%%%%%@%%%%%%%%%%@%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%%@@@@%%%%%%%%%%%%%###################                   
                         #*####*++++++********#########++++*####%@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@@%%%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@%%@%%%%%%%%%%%%@@@@%%#######%%%%%%%%%%##########****#%####                          
                              ++=+++++++++*********###*===++**##%@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#################%@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#*****###%%%%%##########*********                               
                              ++==++++++++++++********+--==+***#%%%##########################%%%%%%%%%#+++++++++++++****%%%%%%%%%%%%%%%%%%%%%%%%%%%##%%%%%%%%#*+++***##%%%########*************                               
                              ++++++++++++++++++******+--==+***#%%####*************###################*++++++++++++++++*%%%%################################%#+++++***##%######****************                               
                               *############%%%%%%%%%%+--==++**#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#**##########**##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*+++++***#%%%%%%%%%%%%%%%%%%%%%%#                                
                                **********************+++****###%%################*****************##*****%%%%%%%%%%**##************************************#*++++****#######################                                 
                                                      -=+==+*##%%*+                                       #%%%%%%%%#                                        ####++*##%%#                                                      
                                               =======-=++=+**###*+++++*                                  +*********                                 =+++++++**#++*####+==+++++                                               
                                              ==========*#+=*##=======+**                                 ++********                                 =++++++++*#++*###*++++++*++                                              
                                              ==========*#++*##+======+**                                 ++++******                                 =+*******##+++**#*+******++                                              
                                               *#####*#%%*=+**#%%#######*                                 +++++++***                                 +######%%#+==+++*%%%%#####                                               
                                                     =++=-=+**#%#=-                                       ++++++++**                                        *##+==+++*##*                                                     
                              ----------             =+=--=+**###==                                       =+++++++++                                        +**+==+++*##**                                                    
                             ------------------=======+=--=+**##%%%#**+++++++++++++++++++++++++++++++++++++++++++++*#++++++++++++++++++++++++++++++*******####*+==+++*##%###**********************                            
                             ----------------=========+=--=++*##%%%#**++++++++++++++++=+=++=+++++++++++++++++++++++*#+++++++++++++++++++++++++++++********###**+==+++*##%###*********************+                            
                             ------------------=======+=--=++**##%##**+++++++++++++============++++++++++++++++++++*#++++++++++++++++++++++++++++++********##**+==+++*######*********************+                            
                             ----------------=========+=--=++**##%##*++++++++++====================++++++++++++++++**++++++++++++++++++++++++++++++++**********+==+++*#####********+++++*********+                            
                             ------------------=======+=--=++**##%##*++++++++++========================++++++++++++**++++++++++++++++++++++++++++++++**********===+++*#####******++++++++++++*****                            
                             ========================+*+--=++**####*+++++++========================================++++++++++++++++++++++++++++++++++++++******===+++*###*******++++++************                            
                             *+**********************+++--=++**###************************+++++++**************************************************************===+++*##*************************                             
                                                     =++--=+++*##++                                                                                         =*+===+++*##+                                                     
                                                     =++--=+++*##++                                                                                         =++=-=+++*##+                                                     
                                                     =++--=+++*##++                                                                                         =++=-=+++*##+                                                     
                                                     =++--==++*##++                                                                                         =++=-=+++*##+                                                     
                                                     =++--=+++*##++                                                                                         =++=-=+++*##+                                                     
                                                     =++--=++**##+=                                                                                         =++=-=+++*##+                                                     
                                                     =++--=++**##+=                                                                                         =++=-=+++*##+                                                     
                                                     =*+-==++**##+=                                                                                         =++=-=+++*##+                                                     
                                                     =*+-==+++*##+=                                                                                         =++=-=+++*##+                                                     
                                                     +*+-==+++*##+                                                                                          =++=-=+++*##*                                                     
                                                     =*+-==++**##+                                                                                          =++=-=+++*##*                                                     
                                                     =*+-==++**##+                                                                                          =++===+++*##*                                                     
                                                     =*+===++**#*+                                                                                          =++===+++*##*+                                                    
                                                     =*+===++*##*+                                                                                          =++===+++*##++                                                    
                       @@@@@@@@@@@                   =*====++*##*+                                      @@@@@@@@@  @                                        =++===+++*##*+                  @@@@@@@@@@                        
                      @@@@@@@@@ @@@@@               ==*===+++*##*+                                  @@@@@  @@@@@@  @@@@@                                    =++===+++*##*+               @@@@@@@@@@@@@@@                      
                      @@@@@@@@@@@@ @@@@@            +=*===+++*##*+                                 @@@@@@@@@@@@@@@@@@@@@@@                                  =++===+++*##*+             @@@  @@@@@@@@@@@                       
                       @@@@@@@@@@   @@ @@           ==*===+++*##*=                               @@@@@@@@@@        @@@@@@@@@@                               =++===++**##*+           @@@   @@@@@@@@@@@@                       
                        @@@@@@@@@@@@  @@@@@@        ==*===+++*##*=                             @@@@@@@@@@@@       @@@@@@@@@@@@                              =++===++**##*+         @@@@@   @@@@@@@@@@@                        
                            @@@@@@@@@ @@    @@@@    ==+===+++*##*=                            @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@                              =++===++**##*+    @@@@@    @@@@@ @@@@@@                           
                               @@@@@@@@ @@     @@@@@@%#+=++++*##*=                            @@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@                               =++===++**###@@@@@@     @@ @@  @@@@                               
                                     @@@@@@         ++*===*%@###*=                              @@@@@@@@ @@@@@ @ @@ @@@@@@@@@@@@                            =++==+%%#*##*+         @@@@@@@@@                                  
                                         @@@@       ++*+==+++*%@%+                             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  @@                            =#@*==++**##*@@      @@@@@                                        
                                            @@@@    ++++%++++*##*=@@@                        @@@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@                           @@*+*+==++**##*+      @@@                                           
                                               @@@  +++==+++**##*=  @@@                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                          @@@ =**+==++**##*+   @@@                                              
                                                  @@@++==+++**##*= @@@@@@@@@@@                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@ @@=+*+==++**##*+@@@@                                                
                                                    +#%%*+++**##*=             @@@@     @@      @@@@@@@@@@@@@@@@@@@@@@@@@@@@        @@@  @@@@@@@@           =+*+==++**#%%%                                                    
                                                    +++==+#@@@%#*=    @@@         @@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@ @@@@@           @    =+*+=*%@%###*+                                                    
                                                    +++==+++**#%#%@@@   @@@          @@         @@@@@@@@@@@@@@    @@@@@@@@@@@@@@       @@@          @@   @@@@@%#++++**##*+                                                    
                          @@@@@@@                   +*+==+++**##*=   @@@@@@@@@ @            @@@@@@@@@@@@@@@@@@@@@ @@@@  @@@@@@@@@@@@@@@@@     @@@@@@ @@@@   ++*+==++**##*+                    @@@@@@@@                        
                   @@@@@@@@@@@@@@@@@@     @   @@    +*+==++***##*=        @@@@   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ @@@@@@@@@  @@@@@@    =+*+=++***##** @@    @  @    @@@@@@@@@@@@@@@@@@                   
                  @@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@***+*#***#%@#%@@@@@@@@@@@@@@@@@@@ @@@         @@       @@@@@@        @@       @@@     @@@@@@@@@@@@@@@@@@##%%#*##%###%%@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@                  
                  @@@@@@@@@@@@@@@@   @@          @  +*+=+++**####@@@@           @@@@@@@@          @@@@@     @@@@@      @@@@       @@@  @@@@@@@            @@@#**=++***##**             @@@@  @@@@@@@@@@@@@@@                  
                    @@@@@@@@@@@@@@@@@@@@@@@@        +*+=+++**###%%  @@                 @@@  @     @ @@        @                 @@  @@@@                   @%+*++++***##**           @@ @@@@@@@@@@@@@@@@@@@                   
                      @@@@@@@@@@@@  @@@@@@@@@@      +*++++***###*@    @@@@             @ @@                                    @   @@@             @@@@@@  @*+*++++***##**         @@@@@@@@   @@@@@@@@@@@                     
                                  @@       @@@@@@@@@+*+++****###%@@@@@@@@@@@@@@ @@@@  @@ @@@@@                                @@@@@@@@ @@     @@@      @@@@@%+*++++***##**  @@@@@@@@@@    @@@@                                
                                                    *****%######+=              @@@@@@@@@@@@@@@@      @       @@              @@@ @@@@@@@@@@@@@             ###**#%@@@@%%%@   @                                               
                                                    +*+++****###+=                      @ @@@@@@@             @ @@           @@@ @@@                        =+*+++****##*+                                                    
                                                    +*+++***####+=                         @@@@@@@ @@        @@@@@@@@@@@@@@ @@@@@@ @                        =+*+++****###+                                                    
                                                    +**++***####+=                          @@@@@@@@@@@  @@@@@@ @@@@@@@@@@@@@@@@@@                          =+*+++***####*                                                    
                                                    +**+****####+=                           @@@@@@@@@@@@@    @@     @        @@@                           =+*+++***####*                                                    
                                                    +**+****####+=                           @@ @@  @        @@@              @@@                           =+*+++***####+                                                    
                                                    +**+***#####+=                            @@@@      @    @@      @        @@                            =+**++***####+                                                    
                                                    *******#####*=                            @@                             @@@                            =+**+***#####*                                                    
                                                    ********####*=                            @@ @@                          @@                             =+**+***#####*                                                    
                                                    *******#####*=                            @@@              @             @@@                            =+******#####*                                                    
                                                ----+*******####*++-:---                        @@                          @@                       --:::::-+******#####+------                                              
                                             +++++++***************+=====                       @@@                        @@                        -----=**********************+                                            
                                             *******#*#############+=====                       @@@   @@     @@@    @@@    @@@                          -=+*#################****                                             
                                             ++*#%%%%%%%%%%%%%%%%%##+                           @@      @     @@     @@     @@                           +***%%%%%%%%%%%%%%%%#                                                
                                                +**%################+                          @@@            @@           @@                            +*++#################                                                
                                                +**%*************###+                          @@            @@@            @@                           +*++***#******######*                                                
                                                +**%*************#*#+                          @@             @@            @@                           =+++*****************                                                
                                                +**#*************#*#+                         @@@@           @@@           @@@@                          =+++*****************                                                
                                                +**#*************#*#=                         @@@@@@@         @  @        @@@@                           =+++*****************                                                
                                                +**#*************#*#=                         @@     @  @                   @@                           =+++*****************                                                
                                                +**#*************#*#=                         @@     @                      @@@                          =+++*****************                                                
                                                +**#*************###=                         @       @                     @@@@                         =+++*****************                                                
                                                +**#*************###+                        @@                             @@@@@                        =+++*****************                                                
                                                +**#*************###+                        @@               @    @ @      @@ @                         =+++*****************                                                
                                                +**#*************###+                      @@@@         @@@  @@ @@@@        @@@@ @                       =+++*****************                                                
                                                +**#*************###+                     @@@@@         @  @@@@@  @@ @@    @@@ @@                        =+++*****************                                                
                                                +**#*************###+                    @@@ @@          @@  @@@@ @@@@      @@  @@                       =+++*****************                                                
                                                +**#*************###+                   @@    @@@@@@@  @@@@@@@@@@@@@@@@@@ @@@    @                       =+++*****************                                                
                                                +**#*************#*#+                  @@    @@            @@@@ @@@@        @@   @@@                     =+++*****************                                                
                                               ++**#**+++********###**+               @@     @@            @@@@ @@@@@       @@     @ @                  =++++*****************+                                               
                                              =+**********************+               @@     @@           @@  @ @@@@@       @@     @@                   **+********************++                                             
                                             **#####################***           @ @@@@     @@          @@@@@@@@@@@@        @      @@                  **#######################                                             
                                             **########################            @@@@      @@         @@   @@   @@  @     @@       @@                 **#######################                                             
                                             **####################%%%              @        @@       @@     @@    @@       @@        @@                **#%%%%%%%%%%%%%#######%#                                             
                                              *#####################               @@        @@      @@      @@    @@@      @@        @@                  #%%%%%%%%%%%%%%%%%##%##                                             
                                                                                  @@          @   @@@ @      @@      @@     @@         @@                                                                                     
                                                                               @ @@          @@ @@@          @@      @@@    @@          @                                                                                     
                                                                                 @@@      @@@ @@@           @@         @@   @@      @@  @@                                                                                    
                                                                                @@@          @@            @@@          @@  @         @@@@                                                                                    
                                                                                 @@ @@      @@@@           @ @@           @@@          @@@@                                                                                   
                                                                               @@@ @@       @@@@          @@ @             @@  @@    @@ @@                                                                                    
                                                                             @@@           @@ @@          @@ @@@          @@@@@          @@@                                                                                  
                                                                             @@ @@       @@    @@       @  @@@@  @@        @ @@@ @       @@@                                                                                  
                                                                           @@@ @@     @@@@     @@          @ @@  @        @@  @@  @@   @   @@@                                                                                
                                                                         @@@ @@ @    @@@  @   @ @@   @     @@@@ @@       @@    @@  @@@@   @@@                                                                                 
                                                                        @@@  @     @@@@        @@@@@       @ @@ @@      @@@     @@    @    @@                                                                                 
                                                                       @@    @ @@@@@@          @@@@       @@ @@  @@     @@       @@@    @@@@@@                                                                                
                                                                     @@@         @@ @          @@        @@@@@@  @@     @@        @@    @@@ @@@                                                                               
                                                                    @@          @@             @@  @@    @@ @@     @@   @@        @@@         @@                                                                              
                                                                   @@@         @@              @@@ @    @@@  @@         @@          @          @@                                                                             
                                                                 @@@          @@              @@@  @    @@@@@@@@       @@@@         @@  @       @@                                                                            
                                                               @@@@@          @@              @@@@@ @@@@@   @@ @@@@@@@ @@@         @@@@ @         @@                                                                          
                                                              @ @@           @@               @      @@@@   @@      @ @@             @@      @     @                                                                          
                                                              @@@@          @@@              @@        @@  @@@        @@             @@             @@                                                                        
                                                              @ @@         @@                @@        @@  @@         @@              @@             @@                                                                       
                                                             @@@@         @@                @@         @@  @@         @@ @             @@            @@                                                                       
                                                             @@@        @@@                 @@          @@ @           @                @@@           @@                                                                      
                                                             @@        @@                   @@@         @@@@           @                  @@@         @@                                                                      
                                                         @@@@@@       @@                    @@@          @ @           @                    @@         @@                                                                     
                                                         @@@@@@      @@                      @@  @       @ @@          @                    @@@    @@   @                                                                     
                                                           @@@      @@                       @@@ @      @@  @@   @     @                      @@@       @@                                                                    
                                                          @ @@    @@@                         @@ @      @@  @@@@@      @                       @@@    @   @                                                                   
                                                           @@     @@                          @@@@@     @@   @@@@      @                         @@       @@@@                                                                
                                                         @@@@     @@                           @@ @      @@  @@@@     @@                           @@       @@                                                                
                                                       @@@@   @ @@@                             @@ @     @@  @@@@     @@                            @@ @     @@ @       @@                                                    
                                                   @@@@@        @@                               @@      @@  @@ @@     @                             @@@@   @@@@ @@@@@@ @@@@                                                  
                                                    @@@@@@      @@                                @@@@   @@   @@       @                               @@@          @@   @@                                                   
                                                     @@@@@@@@@@ @                                  @@     @@   @@      @@                              @@@@ @       @@@@@@                                                    
                                                        @@@@@@@@@                                  @@@     @@  @@@     @@@                              @        @@@@@@                                                       
                                                             @@@@                                @@ @@      @@  @@@ @@ @@@                              @@ @   @@                                                             
                                                                                                @  @@@ @@@@@@@  @@@@     @@@@@@                         @@@@@@@@                                                              
                                                                                                 @@@@@@@    @@@ @@@@@@      @@@@ @@                        @                                                                  
                                                                                                @  @@@        @@@              @@@@@@@@@                                                                                      
                                                                                                  @@@@@@@@@@@@@@@@   @@@@@        @@ @@@@                                                                                     
                                                                                                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                                        
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              
                                                                                                                                                                                                                              