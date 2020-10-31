<div class="box-footer">

    <?php echo e(csrf_field(), false); ?>


    <div class="col-md-<?php echo e($width['label'], false); ?>">
    </div>

    <div class="col-md-<?php echo e($width['field'], false); ?>">

        <?php if(in_array('submit', $buttons)): ?>
        <div class="btn-group pull-right">
            <button type="submit" class="btn btn-primary"><?php echo e(trans('admin.submit'), false); ?></button>
        </div>

        <?php $__currentLoopData = $submit_redirects; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $value => $redirect): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php if(in_array($redirect, $checkboxes)): ?>
            <label class="pull-right" style="margin: 5px 10px 0 0;">
                <input type="checkbox" class="after-submit" name="after-save" value="<?php echo e($value, false); ?>" <?php echo e(($default_check == $redirect) ? 'checked' : '', false); ?>> <?php echo e(trans("admin.{$redirect}"), false); ?>

            </label>
            <?php endif; ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

        <?php endif; ?>

        <?php if(in_array('reset', $buttons)): ?>
        <div class="btn-group pull-left">
            <button type="reset" class="btn btn-warning"><?php echo e(trans('admin.reset'), false); ?></button>
        </div>
        <?php endif; ?>
    </div>
</div><?php /**PATH /usr/local/var/www/tools_manage/resources/views/admin/form/footer.blade.php ENDPATH**/ ?>