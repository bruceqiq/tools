<div class="box box-info">
    <div class="box-header with-border">
        <h3 class="box-title"><?php echo e($form->title(), false); ?></h3>

        <div class="box-tools">
            <?php echo $form->renderTools(); ?>

        </div>
    </div>
    <!-- /.box-header -->
    <!-- form start -->
    <?php echo $form->open(['class' => "form-horizontal"]); ?>


    <div class="box-body">

        <?php if(!$tabObj->isEmpty()): ?>
            <?php echo $__env->make('admin::form.tab', compact('tabObj'), \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php else: ?>
            <div class="fields-group">

                <?php if($form->hasRows()): ?>
                    <?php $__currentLoopData = $form->getRows(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php echo $row->render(); ?>

                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php else: ?>
                    <?php $__currentLoopData = $layout->columns(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $column): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <div class="col-md-<?php echo e($column->width(), false); ?>">
                            <?php $__currentLoopData = $column->fields(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $field): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php echo $field->render(); ?>

                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>

    </div>
    <!-- /.box-body -->

    <?php echo $form->renderFooter(); ?>


    <?php $__currentLoopData = $form->getHiddenFields(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $field): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php echo $field->render(); ?>

    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

<!-- /.box-footer -->
    <?php echo $form->close(); ?>

</div>

<?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/form.blade.php ENDPATH**/ ?>