export const theme = {
  colors: {
    // Primary Feedants Palette (matched from Objective_Page.png)
    primary: '#00796B',         // Classic Feedants teal
    primaryDark: '#00635A',     // Dark teal for CTA / active pills
    primaryLight: '#E8F7F5',    // Mint background for banner/cards
    mintSoft: '#F0FAF8',        // Extra soft mint tint
    background: '#F5F7FA',      // Screen light background
    card: '#FFFFFF',            // Card white
    textPrimary: '#1E293B',     // Charcoal heading
    textSecondary: '#64748B',   // Subheading slate gray
    textMuted: '#94A3B8',       // Light gray metadata
    border: '#E2E8F0',          // Subtle border
    borderTeal: '#BCE3DC',      // Soft teal border
    accentRed: '#EF4444',       // Alert/urgency red
    accentGreen: '#10B981',     // Success green
    accentAmber: '#F59E0B',     // Gold / trophy amber
    badgeBackground: '#E6F4F1', // Mint badge background
    tagBackground: '#F1F5F9',   // Light gray capsule tag
    tagText: '#475569',         // Gray tag text
    progressBarTrack: '#D1EAE5',// Mint track
    progressBarFill: '#00796B', // Teal progress fill
    shadowColor: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
    h2: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
    h3: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
    body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    bodyMedium: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    bodyBold: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    captionMedium: { fontSize: 12, fontWeight: '600', lineHeight: 16 },
    micro: { fontSize: 10, fontWeight: '600', lineHeight: 14 },
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    float: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
      elevation: 5,
    },
  },
};
