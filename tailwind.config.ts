import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-in-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'shimmer': {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
				'sparkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.6', transform: 'scale(0.8)' }
				},
				'rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'blur-in': {
					'0%': { filter: 'blur(5px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				},
				'width': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'train-motion': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'smoke': {
					'0%': { opacity: '0.7', transform: 'translateY(0px) scale(1)' },
					'100%': { opacity: '0', transform: 'translateY(-50px) translateX(20px) scale(2)' }
				},
				'railway-track': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-20%)' }
				},
				'signal-light': {
					'0%, 30%': { opacity: '1' },
					'40%, 100%': { opacity: '0.3' }
				},
				'wheel-rotation': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'soft-fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'smooth-scale': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-highlight': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 120, 255, 0)' },
					'50%': { boxShadow: '0 0 0 4px rgba(0, 120, 255, 0.2)' }
				},
				'gradient-shimmer': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' }
				},
				'smooth-reveal': {
					'0%': { opacity: '0', transform: 'translateY(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'subtle-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 120, 255, 0)' },
					'50%': { boxShadow: '0 0 15px 2px rgba(0, 120, 255, 0.15)' }
				},
				'border-pulse': {
					'0%, 100%': { borderColor: 'rgba(0, 120, 255, 0.3)' },
					'50%': { borderColor: 'rgba(0, 120, 255, 0.8)' }
				},
				'beam-fade': {
					'0%, 100%': { opacity: '0' },
					'50%': { opacity: '1' },
				},
				'text-gradient': {
					'to': {
						'backgroundPosition': '200% center',
					},
				},
				'background-shine': {
					'from': { backgroundPosition: '0 0' },
					'to': { backgroundPosition: '-200% 0' },
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '1',
					},
					'50%': {
						opacity: '0.5',
					},
				},
				'border-width': {
					'from': { width: '10px', opacity: '0' },
					'50%': { width: '100px', opacity: '0.5' },
					'to': { width: '10px', opacity: '0' },
				},
				'meteor': {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
					'70%': { opacity: '1' },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'fade-out': 'fade-out 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'scale-out': 'scale-out 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'slide-in-up': 'slide-in-up 0.5s ease-out',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'float': 'float 3s infinite ease-in-out',
				'bounce-soft': 'bounce-soft 2s infinite ease-in-out',
				'shimmer': 'shimmer 2s infinite',
				'sparkle': 'sparkle 2s infinite ease-in-out',
				'rotate': 'rotate 8s linear infinite',
				'blur-in': 'blur-in 0.4s ease-out',
				'width': 'width 1s ease-out forwards',
				'page-transition': 'fade-in 0.4s ease-out, scale-in 0.3s ease-out',
				'train-motion': 'train-motion 15s linear infinite',
				'smoke': 'smoke 4s ease-out forwards',
				'railway-track': 'railway-track 10s linear infinite',
				'signal-light': 'signal-light 6s infinite',
				'wheel-rotation': 'wheel-rotation 3s linear infinite',
				'soft-fade-in': 'soft-fade-in 0.5s ease-out forwards',
				'smooth-scale': 'smooth-scale 0.4s ease-out forwards',
				'pulse-highlight': 'pulse-highlight 2s infinite ease-in-out',
				'gradient-shimmer': 'gradient-shimmer 2.5s infinite linear',
				'smooth-reveal': 'smooth-reveal 0.5s ease-out forwards',
				'subtle-bounce': 'subtle-bounce 2s infinite ease-in-out',
				'glow-pulse': 'glow-pulse 2s infinite ease-in-out',
				'border-pulse': 'border-pulse 2s infinite ease-in-out',
				'beam-fade': 'beam-fade 2s ease-out infinite',
				'text-gradient': 'text-gradient 1.5s linear infinite',
				'background-shine': 'background-shine 2s linear infinite',
				'pulse-slow': 'pulse-slow 6s infinite cubic-bezier(0.4, 0, 0.6, 1)',
				'border-width': 'border-width 3s infinite',
				'meteor-effect': 'meteor 5s linear infinite',
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
				heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-shine': 'linear-gradient(45deg,rgba(255,255,255,0) 25%,rgba(255,255,255,0.3) 50%,rgba(255,255,255,0) 75%)',
				'meteor-gradient': 'linear-gradient(45deg, #4f46e5, #ff0080)',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
	],
} satisfies Config;
