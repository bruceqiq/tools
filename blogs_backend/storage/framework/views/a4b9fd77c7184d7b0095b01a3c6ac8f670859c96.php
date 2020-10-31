<div class="nav-tabs-custom">
    <ul class="nav nav-tabs">

        <?php $__currentLoopData = $tabObj->getTabs(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tab): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li <?php echo e($tab['active'] ? 'class=active' : '', false); ?>>
                <a href="#tab-<?php echo e($tab['id'], false); ?>" data-toggle="tab">
                    <?php echo e($tab['title'], false); ?> <i class="fa fa-exclamation-circle text-red hide"></i>
                </a>
            </li>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    </ul>
    <div class="tab-content fields-group">

        <?php $__currentLoopData = $tabObj->getTabs(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tab): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="tab-pane <?php echo e($tab['active'] ? 'active' : '', false); ?>" id="tab-<?php echo e($tab['id'], false); ?>">
                <?php $__currentLoopData = $tab['fields']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $field): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php echo $field->render(); ?>

                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    </div>
</div><?php /**PATH /home/wwwroot/blogs_backend/resources/views/admin/form/tab.blade.php ENDPATH**/ ?>