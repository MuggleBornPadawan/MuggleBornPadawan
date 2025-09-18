# Gnuplot script to animate the 3D random walk from path.dat

# --- Configuration ---
# Set the output format to an animated GIF
set terminal gif animate delay 50 # Delay 5 centiseconds (20 FPS)

# Set the output filename
set output 'random_walk.gif'

# --- Plot Aesthetics ---
set title "3D Random Walk"
set xlabel "X-axis"
set ylabel "Y-axis"
set zlabel "Z-axis"

# Tidy up the plot
unset key      # Don't show a legend/key
set ticslevel 0 # Put the axes planes at the back

# --- The Animation Loop ---
# Gnuplot can tell you how many lines are in a file. We'll use that!
# Note: This part is a bit of a clever hack using system commands.
STATS_LINES = system("wc -l < path.dat")
NUM_POINTS = int(STATS_LINES)

# Loop from 1 point to the total number of points
do for [i=1:NUM_POINTS] {
    # 'splot' is for 3D plots.
    # 'every ::0::i' tells gnuplot to plot from the first line (0) up to the i-th line.
    # 'with lines' connects the points to form a path.
    splot 'path.dat' every ::0::i with lines
}

set output # Close the output file
print "Animation 'random_walk.gif' has been generated."