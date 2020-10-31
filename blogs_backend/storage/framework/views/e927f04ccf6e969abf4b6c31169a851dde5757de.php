<div <?php echo $attributes; ?>>
    <?php if($title || $tools): ?>
        <div class="box-header with-border">
            <h3 class="box-title"><?php echo e($title, false); ?></h3>
            <div class="box-tools pull-right">
                <?php $__currentLoopData = $tools; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tool): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $tool; ?>

                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div><!-- /.box-tools -->
        </div><!-- /.box-header -->
    <?php endif; ?>
    <div class="box-body" style="display: block;">
        <?php echo $content; ?>

    </div><!-- /.box-body -->
    <?php if($footer): ?>
        <div class="box-footer">
            <?php echo $footer; ?>

        </div><!-- /.box-footer-->
    <?php endif; ?>
</div>

<script>
    <?php echo $script; ?>

</script><?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/widgets/box.blade.php ENDPATH**/ ?>