<div class="box box-<?php echo e($style, false); ?>">
    <div class="box-header with-border">
        <h3 class="box-title"><?php echo e($title, false); ?></h3>

        <div class="box-tools">
            <?php echo $tools; ?>

        </div>
    </div>
    <!-- /.box-header -->
    <!-- form start -->
    <div class="form-horizontal">

        <div class="box-body">

            <div class="fields-group">

                <?php $__currentLoopData = $fields; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $field): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $field->render(); ?>

                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>

        </div>
        <!-- /.box-body -->
    </div>
</div><?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/show/panel.blade.php ENDPATH**/ ?>