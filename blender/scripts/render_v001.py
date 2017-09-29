
import time
import bpy

## todo
#  - write something that will automatically read camera keyframes and produce time blocks
#  - name the rendered movies
#  - write something to automate the mirroring of the camera animations

# establish the time blocks that will be rendered
block_001 = [0, 30]
block_002 = [30, 40]
block_003 = [40, 50]
block_004 = [50, 60]
block_005 = [60, 70]
block_006 = [70, 102]
block_007 = [102, 115]
block_008 = [115, 230]
block_009 = [230, 240]
block_010 = [240, 250]
block_011 = [250, 260]
block_012 = [260, 335]
block_013 = [335, 355]
block_014 = [355, 375]
block_015 = [375, 385]
block_016 = [385, 395]
block_017 = [395, 405]
block_018 = [405, 420]
block_019 = [420, 435]

# assemble the blocks into an array
blocks = [
    block_001,
    block_002,
    block_003,
    block_004,
    block_005,
    block_006,
    block_007,
    block_008,
    block_009,
    block_010,
    block_011,
    block_012,
    block_013,
    block_014,
    block_015,
    block_016,
    block_017,
    block_018,
    block_019
    ]

## start the rendering process

# list the blocks before continuing
for block in blocks:
    print('start: {0}, end: {1}'.format(block[0], block[1]))
    bpy.data.scenes['Scene'].frame_end = block[1]
    bpy.data.scenes['Scene'].frame_start = block[0]
    bpy.ops.render.render(animation=True, write_still=False, use_viewport=False, layer="", scene="")
    time.sleep(0.5)
