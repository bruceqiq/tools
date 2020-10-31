<div class="<?php echo e($viewClass['form-group'], false); ?> <?php echo !$errors->has($errorKey) ? '' : 'has-error'; ?>">

    <label for="<?php echo e($id, false); ?>" class="<?php echo e($viewClass['label'], false); ?> control-label"><?php echo e($label, false); ?></label>

    <div class="<?php echo e($viewClass['field'], false); ?>">

        <?php echo $__env->make('admin::form.error', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

        <input type="checkbox" class="<?php echo e($class, false); ?> la_checkbox" <?php echo e(old($column, $value) == 'on' ? 'checked' : '', false); ?> <?php echo $attributes; ?> />
        <input type="hidden" class="<?php echo e($class, false); ?>" name="<?php echo e($name, false); ?>" value="<?php echo e(old($column, $value), false); ?>" />

        <?php echo $__env->make('admin::form.help-block', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    </div>
</div>
<?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/form/switchfield.blade.php ENDPATH**/ ?>