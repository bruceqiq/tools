<form <?php echo $attributes; ?>>
    <div class="box-body fields-group">

        <?php $__currentLoopData = $fields; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $field): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php echo $field->render(); ?>

        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    </div>

    <?php if($method != 'GET'): ?>
        <input type="hidden" name="_token" value="<?php echo e(csrf_token(), false); ?>">
    <?php endif; ?>
    
    <!-- /.box-body -->
    <?php if(count($buttons) > 0): ?>
    <div class="box-footer">
        <div class="col-md-<?php echo e($width['label'], false); ?>"></div>

        <div class="col-md-<?php echo e($width['field'], false); ?>">
            <?php if(in_array('reset', $buttons)): ?>
            <div class="btn-group pull-left">
                <button type="reset" class="btn btn-warning pull-right"><?php echo e(trans('admin.reset'), false); ?></button>
            </div>
            <?php endif; ?>

            <?php if(in_array('submit', $buttons)): ?>
            <div class="btn-group pull-right">
                <button type="submit" class="btn btn-info pull-right"><?php echo e(trans('admin.submit'), false); ?></button>
            </div>
            <?php endif; ?>
        </div>
    </div>
    <?php endif; ?>
</form>
<?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/widgets/form.blade.php ENDPATH**/ ?>