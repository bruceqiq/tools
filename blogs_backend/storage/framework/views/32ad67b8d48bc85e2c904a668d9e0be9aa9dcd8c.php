<div class="input-group input-group-sm">
    <?php if($group): ?>
    <div class="input-group-btn">
        <input type="hidden" name="<?php echo e($id, false); ?>_group" class="<?php echo e($group_name, false); ?>-operation" value="0"/>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="min-width: 32px;">
            <span class="<?php echo e($group_name, false); ?>-label"><?php echo e($default['label'], false); ?></span>
            &nbsp;&nbsp;
            <span class="fa fa-caret-down"></span>
        </button>
        <ul class="dropdown-menu <?php echo e($group_name, false); ?>">
            <?php $__currentLoopData = $group; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li><a href="#" data-index="<?php echo e($index, false); ?>"> <?php echo e($item['label'], false); ?> </a></li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    </div>
    <?php endif; ?>
        <div class="input-group-addon">
            <i class="fa fa-<?php echo e($icon, false); ?>"></i>
        </div>

    <input type="<?php echo e($type, false); ?>" class="form-control <?php echo e($id, false); ?>" placeholder="<?php echo e($placeholder, false); ?>" name="<?php echo e($name, false); ?>" value="<?php echo e(request($name, $value), false); ?>">
</div><?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/filter/text.blade.php ENDPATH**/ ?>