# Gnuplot script to generate a static 3D random walk plot from path.dat

# --- Configuration ---
# Set the output format to a PNG image
set terminal pngcairo size 800,600 enhanced font 'Verdana,10'

# Set the output filename
set output 'random_walk.png'

# --- Plot Aesthetics ---
#set title "3D Random Walk"
#set xlabel "X-axis"
#set ylabel "Y-axis"
#set zlabel "Z-axis"

# Tidy up the plot
unset key      # Don't show a legend/key
#set mxtics 5
#set mytics 5
#set grid xtics mxtics ytics mytics ztics
set grid xtics ytics ztics
#unset grid     # Remove grid lines
#unset border   # Remove the border/axes
#unset tics     # Remove the numbers on the axes
set ticslevel 0 # Put the axes planes at the back

# --- Plotting ---
# 'splot' is for 3D plots.
# 'with lines' connects the points to form a path.
splot 'path.dat' with lines

set output # Close the output file
print "Static plot 'random_walk.png' has been generated."
