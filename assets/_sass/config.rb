 # Require any additional compass plugins here.
# -----------------------------------------------------------------------------
require 'singularitygs'
require 'sass-globbing'

# Set this to the root of your project when deployed:
# -----------------------------------------------------------------------------

http_path = "/"
sass_dir = "./"
css_dir = "../css"
images_dir = "../img"
javascripts_dir = "../js"
relative_assets = true
#svg_dir = "assets/svg"
#fonts_dir = "assets/fonts"

# Output style and comments
# -----------------------------------------------------------------------------

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# Over-ride with force compile to change output style with: compass compile --output-style compressed --force
output_style = :expanded

line_comments = false
cache = true
color_output = false # required for Mixture




# SASS core
# -----------------------------------------------------------------------------

# Chrome needs a precision of 7 to round properly
Sass::Script::Number.precision = 7